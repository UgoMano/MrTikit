package com.mrtikit.mrtikit;

import android.graphics.Bitmap;
import android.support.v4.app.NavUtils;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.app.ActionBar;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.MenuItem;
import android.widget.ImageView;
import android.widget.TextView;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.mrtikit.providers.Ticket;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


public class MyTicketActivity extends AppCompatActivity {
    ImageView qrCodeImageView;
    String QRcode;
    public final static int WIDTH=500;
    Toolbar toolbar = null;
    TextView textView = null;
    Ticket ticket = new Ticket();
    //ActionBar actionBar = getSupportActionBar();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my_ticket);
        getID();
        toolbar = (Toolbar) findViewById(R.id.actionbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        textView = (TextView) findViewById(R.id.textView);

        Thread thread = new Thread(new Runnable() {
            public void run() {

                // this is the msg which will be encode in QRcode

                //change the int below

                String scanId  = getIntent().getStringExtra("SCANID");
                String title = getIntent().getStringExtra("NAME");

                textView.setText(title);

                QRcode = "26db7fb0878228f71";

                try {
                    synchronized (this) {
                        wait(5);
                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                            try {
                                Bitmap bitmap = null;

                                bitmap = encodeAsBitmap(QRcode);
                                qrCodeImageView.setImageBitmap(bitmap);

                            } catch (WriterException e) {
                                e.printStackTrace();
                            } // end of catch block

                        } // end of run method
                    });

                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

            }
        });
        thread.start();

    }

    private void getID() {
        qrCodeImageView = (ImageView) findViewById(R.id.img_qr_code_image);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                NavUtils.navigateUpFromSameTask(this);
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }

    // this is method call from on create and return bitmap image of QRCode.
    Bitmap encodeAsBitmap(String str) throws WriterException {
        BitMatrix result;
        try {
            result = new MultiFormatWriter().encode(str,
                    BarcodeFormat.QR_CODE, WIDTH, WIDTH, null);
        } catch (IllegalArgumentException iae) {
            // Unsupported format
            return null;
        }
        int w = result.getWidth();
        int h = result.getHeight();
        int[] pixels = new int[w * h];
        for (int y = 0; y < h; y++) {
            int offset = y * w;
            for (int x = 0; x < w; x++) {
                pixels[offset + x] = result.get(x, y) ? getResources().getColor(R.color.black):getResources().getColor(R.color.white);
            }
        }
        Bitmap bitmap = Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888);
        bitmap.setPixels(pixels, 0, 500, 0, 0, w, h);

        return bitmap;
    }


}