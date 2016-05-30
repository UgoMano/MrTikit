package com.mrtikit.providers;

import org.json.JSONObject;

public interface Api
{
    public void find(int id, String token);
    public String findAll(String token);
    public void create(JSONObject json, String token);
    public void update(JSONObject json, String token);
}
