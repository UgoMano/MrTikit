package com.mrtikit.providers;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.HttpRetryException;
import java.net.URL;
import org.json.JSONException;
import org.json.JSONObject;

public class User implements Api {

    public void find(int id, String token) {
        // TODO Auto-generated method stub

    }

    public String findAll(String token) {
        // TODO Auto-generated method stub
        return null;
    }

    public void create(JSONObject json, String token) {
        // TODO Auto-generated method stub

    }

    public void update(JSONObject json, String token) {
        // TODO Auto-generated method stub

    }

    public static String login(String username, String password) throws IOException, JSONException
    {
        String line = "";
        StringBuffer result = new StringBuffer();

        JSONObject json = new JSONObject();
        json.put("email", username);
        json.put("password", password);
        json.put("event", 2);

        URL url = new URL("");
        String message = json.toString();

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setDoOutput(true);

        conn.setRequestProperty("Content-Type", "application/json;charset=utf-8");
        conn.setRequestProperty("Authorization", "JWT");

        OutputStream os = new BufferedOutputStream(conn.getOutputStream());
        os.write(message.getBytes());
        os.flush();

        conn.connect();

        try
        {
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(conn.getInputStream()));

            while ((line = reader.readLine()) != null)
                result.append(line);

        }
        catch(HttpRetryException e)
        {

        }

        conn.disconnect();

        return result.toString();
    }
}
