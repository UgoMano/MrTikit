package com.mrtikit.mrtikit.contentList;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.mrtikit.mrtikit.TokenHolder;
import com.mrtikit.providers.Ticket;
import com.mrtikit.providers.Event;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONArray;

/**
 * Helper class for providing sample content for user interfaces created by
 * Android template wizards.
 * <p/>
 */
public class EventsContent {

    com.mrtikit.providers.Event Event;

    static String loginKey = "";

    public static Ticket ticket = new Ticket();

    public static Event event = new Event();

    /**
     * An array of items.
     */
    public static final List<EventItem> ITEMS = new ArrayList<EventItem>();

    /**
     * A map of items, by ID.
     */
    public static final Map<String, EventItem> ITEM_MAP = new HashMap<String, EventItem>();

    static {
        // Add some sample items.

        loginKey = TokenHolder.getToken();

        try {

            int COUNT = 0;

            String jsonString = event.findAll(loginKey);
            JSONObject myTickets = new JSONObject(jsonString);
            JSONArray res = myTickets.getJSONArray("data");

            COUNT = res.length();

            for (int i = 0; i <= COUNT; ++i) {
                JSONObject element = res.getJSONObject(i);
                String title = element.getString("title");
                addItem(createEventItem(title));
            }
        }
        catch (JSONException e)
        {
            e.printStackTrace();
        }

    }

    private static void addItem(EventItem item) {
        ITEMS.add(item);
        ITEM_MAP.put(item.id, item);
    }

    private static EventItem createEventItem(String position) {
        return new EventItem(String.valueOf(position), "Item " + position, makeDetails(position));
    }

    private static String makeDetails(String position) {

        StringBuilder builder = new StringBuilder();
        builder.append("Details about Item: ").append(position);
        //Random number 5
        for (int i = 0; i < 5; i++) {
            builder.append("\nMore details information here.");
        }
        return builder.toString();
    }

    /**
     * An item representing a piece of content.
     */
    public static class EventItem {
        public final String id;
        public final String content;
        public final String details;

        public EventItem(String id, String content, String details) {
            this.id = id;
            this.content = content;
            this.details = details;
        }

        @Override
        public String toString() {
            return content;
        }
    }
}