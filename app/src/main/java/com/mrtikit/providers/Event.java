package com.mrtikit.providers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.HttpRetryException;
import java.net.URL;



public class Event implements Api
{

    StringBuffer result = new StringBuffer();

    public static String output;

    public void find(int id, String token)
    {
        String line = "";
        StringBuffer result = new StringBuffer();

        CloseableHttpClient client = HttpClients.createDefault();
        HttpGet get = new HttpGet("http://54.69.160.45:8000/v1/events/" + id);

        try {
            get.setHeader("Content-type", "application/json");
        } catch (Exception e) {
            e.printStackTrace();
        }
        get.setHeader("Authorization", "JWT " + token);

        CloseableHttpResponse response = null;
        try {
            response = client.execute(get);
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        int statusCode = response.getStatusLine().getStatusCode();
        assert(statusCode == 200);

        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
        } catch (UnsupportedOperationException e1) {
            e1.printStackTrace();
        } catch (IOException e1) {
            e1.printStackTrace();
        }
        try {
            while ((line = reader.readLine()) != null)
                result.append(line);
        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println(result.toString());

        try {
            client.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public String findAll(final String token) {
        try {
            Thread thread = new Thread(new Runnable() {
                @Override
                public void run() {
                    try {
                        String line = "";

                        URL url = new URL("http://54.69.160.45:8000/v1/events/");
                        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                        conn.setRequestMethod("GET");

                        conn.setRequestProperty("Content-Type", "application/json;charset=utf-8");
                        conn.setRequestProperty("Authorization", "JWT " + token);
                        conn.setDoInput(true);
                        InputStreamReader inputStream = new InputStreamReader(conn.getInputStream());
                        BufferedReader reader = new BufferedReader(inputStream);
                        while ((line = reader.readLine()) != null) {
                            result.append(line);
                        }

                        conn.disconnect();

                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            });

            thread.start();
            thread.join();


        } catch (InterruptedException e) {

        }

        return result.toString();
    }

    @Override
    public void create(JSONObject json, String token) {
        // TODO Auto-generated method stub

    }

    @Override
    public void update(JSONObject json, String token) {
        // TODO Auto-generated method stub

    }
}
