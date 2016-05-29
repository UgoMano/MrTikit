package com.mrtikit.mrtikit;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.provider.Settings;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.ListFragment;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ListView;

import com.mrtikit.mrtikit.contentList.TicketsContent;
import com.mrtikit.mrtikit.contentList.TicketsContent.TicketItem;
import com.mrtikit.providers.Ticket;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * A fragment representing a list of Items.
 * <p/>
 */
public class MyTicketsFragment extends Fragment {

    // TODO: Customize parameter argument names
    private static final String ARG_COLUMN_COUNT = "column-count";
    // TODO: Customize parameters
    private int mColumnCount = 1;
    MyTicketsRecyclerViewAdapter adapter;
    FragmentActivity mActivity;
    private String scanId;

    /**
     * Mandatory empty constructor for the fragment manager to instantiate the
     * fragment (e.g. upon screen orientation changes).
     */
    public MyTicketsFragment() {
    }

    static String loginKey = TokenHolder.getToken();
    static int COUNT = 0;

    Ticket ticket = new Ticket();

    // TODO: Customize parameter initialization
    @SuppressWarnings("unused")
    public static MyTicketsFragment newInstance(int columnCount) {
        MyTicketsFragment fragment = new MyTicketsFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_COLUMN_COUNT, columnCount);
        fragment.setArguments(args);
        return fragment;
    }


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


        if (getArguments() != null) {
            mColumnCount = getArguments().getInt(ARG_COLUMN_COUNT);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) throws ExceptionInInitializerError {
        View view = inflater.inflate(R.layout.fragment_my_tickets_list, container, false);

        // Set the adapter
        if (view instanceof RecyclerView) {
            final Context context = view.getContext();
            RecyclerView recyclerView = (RecyclerView) view;
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(context));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(context, mColumnCount));
            }
            recyclerView.setAdapter(new MyTicketsRecyclerViewAdapter(context, TicketsContent.ITEMS, new MyTicketsRecyclerViewAdapter.OnItemClickListener() {
                @Override
                public void onItemClick(TicketItem item) {
                    Intent intent = new Intent(context, MyTicketActivity.class);
                    intent.putExtra("NAME", item.id);

                    try {
                        JSONObject json = new JSONObject(ticket.findAll(loginKey));

                        System.out.println("\n");

                        JSONArray res = json.getJSONArray("data");
                        COUNT = res.length();
                        for (int i = 0; i < COUNT; ++i) {
                            JSONObject element = res.getJSONObject(i);
                            JSONObject element2 = element.getJSONObject("event");
                            if (element2.getString("title").equalsIgnoreCase(item.id)) {
                                scanId = element.getString("scanId");
                                System.out.println(scanId);
                            }
                        }
                    }
                    catch (JSONException e)
                    {
                        e.printStackTrace();
                    }


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


