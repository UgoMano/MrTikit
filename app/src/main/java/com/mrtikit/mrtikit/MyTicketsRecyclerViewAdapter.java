package com.mrtikit.mrtikit;

import android.content.Context;
import android.content.Intent;
import android.support.v4.app.FragmentActivity;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.mrtikit.mrtikit.contentList.TicketsContent.TicketItem;

import java.util.List;

public class MyTicketsRecyclerViewAdapter extends RecyclerView.Adapter<MyTicketsRecyclerViewAdapter.ViewHolder> {

    public interface OnItemClickListener {
        void onItemClick(TicketItem item);
    }

    private final List<TicketItem> mValues;
    private final Context mContext;
    OnItemClickListener mItemClickListener;
    FragmentActivity mActivity;


    public MyTicketsRecyclerViewAdapter(Context context, List<TicketItem> items, OnItemClickListener listener) {
        mValues = items;
        mItemClickListener = listener;
        mContext = context;
    }

    Toolbar toolbar = null;

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {

        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_my_tickets, parent, false);
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

        public void bind(final TicketItem items, final OnItemClickListener listener) {
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


