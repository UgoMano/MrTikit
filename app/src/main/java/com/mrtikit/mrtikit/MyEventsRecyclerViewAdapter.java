package com.mrtikit.mrtikit;

import android.content.Context;
import android.content.Intent;
import android.support.v4.app.FragmentActivity;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.mrtikit.mrtikit.contentList.EventsContent.EventItem;

import java.util.List;

/**
 * TODO: Replace the implementation with code for your data type.
 */
public class MyEventsRecyclerViewAdapter extends RecyclerView.Adapter<MyEventsRecyclerViewAdapter.ViewHolder> {

    public interface OnItemClickListener {
        void onItemClick(EventItem item);
    }

    private final List<EventItem> mValues;
    private final Context mContext;
    OnItemClickListener mItemClickListener;
    FragmentActivity mActivity;


    public MyEventsRecyclerViewAdapter(Context context, List<EventItem> items, OnItemClickListener listener) {
        mValues = items;
        mItemClickListener = listener;
        mContext = context;
    }


    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_my_events, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, final int position) {

        holder.bind(mValues.get(position), mItemClickListener);
    }


    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final Context context;
        public final View mView;
        public final TextView mIdView;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            mIdView = (TextView) view.findViewById(R.id.id);
            context = view.getContext();
            view.setClickable(true);
        }

        public void bind(final EventItem items, final OnItemClickListener listener) {
            mIdView.setText(items.id);
            //Picasso.with(itemView.getContext()).load(item.imageUrl).into(image);

            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    listener.onItemClick(items);
                }
            });
        }

        @Override
        public String toString() {
            return super.toString() + " '" + "'";
        }
    }
}


