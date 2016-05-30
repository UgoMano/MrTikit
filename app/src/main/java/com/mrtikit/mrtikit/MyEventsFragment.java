package com.mrtikit.mrtikit;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.ListFragment;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.mrtikit.mrtikit.contentList.EventsContent;
import com.mrtikit.mrtikit.contentList.EventsContent.EventItem;
import com.mrtikit.mrtikit.contentList.EventsContent;
import com.mrtikit.providers.Event;
import com.mrtikit.providers.Event;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * A fragment representing a list of Items.
 */
public class MyEventsFragment extends Fragment {

    private static final String ARG_COLUMN_COUNT = "column-count";

    private int mColumnCount = 1;
    private String scanId;

    /**
     * Mandatory empty constructor for the fragment manager to instantiate the
     * fragment (e.g. upon screen orientation changes).
     */
    public MyEventsFragment() {
    }

    @SuppressWarnings("unused")
    public static MyEventsFragment newInstance(int columnCount) {
        MyEventsFragment fragment = new MyEventsFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_COLUMN_COUNT, columnCount);
        fragment.setArguments(args);
        return fragment;
    }

    static String loginKey = "";

    Event event = new Event();

    Toolbar toolbar = null;
    
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getArguments() != null) {
            mColumnCount = getArguments().getInt(ARG_COLUMN_COUNT);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_my_events_list, container, false);

        try {

            loginKey = TokenHolder.getToken();

            int COUNT = 0;

            String jsonString = event.findAll(loginKey);
            JSONObject myEvents = new JSONObject(jsonString);
            JSONArray res = myEvents.getJSONArray("data");

            COUNT = res.length();

            for (int i = 0; i <= COUNT; ++i) {
                JSONObject element = res.getJSONObject(i);
                //scanId = element.getString("scanId");
            }
        }
        catch (JSONException e)
        {
            e.printStackTrace();
        }
        
        // Set the adapter
        if (view instanceof RecyclerView) {
            final Context context = view.getContext();
            RecyclerView recyclerView = (RecyclerView) view;
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(context));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(context, mColumnCount));
            }
            recyclerView.setAdapter(new MyEventsRecyclerViewAdapter(context, EventsContent.ITEMS, new MyEventsRecyclerViewAdapter.OnItemClickListener() {
                @Override
                public void onItemClick(EventsContent.EventItem item) {
                    Intent intent = new Intent(context, MyEventActivity.class);
                    intent.putExtra("NAME", item.id);
                    intent.putExtra("SCANID", scanId);
                    context.startActivity(intent);
                    System.out.println(item.id);
                }
            }));

        }
        return view;
    }


    @Override
    public void onAttach(Context context) {
        super.onAttach(context);

    }

    @Override
    public void onDetach() {
        super.onDetach();
    }
}
