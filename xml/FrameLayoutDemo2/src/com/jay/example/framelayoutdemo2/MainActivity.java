package com.jay.example.framelayoutdemo2;

import android.os.Bundle;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnTouchListener;
import android.widget.FrameLayout;
import android.app.Activity;


public class MainActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
		FrameLayout frame = (FrameLayout) findViewById(R.id.mylayout);
		final MeziView mezi = new MeziView(MainActivity.this);
		
		//为我们的萌妹子添加触摸事件监听器
		mezi.setOnTouchListener(new OnTouchListener() {
			
			@Override
			public boolean onTouch(View view, MotionEvent event) {
				//设置妹子显示的位置
				mezi.bitmapX = event.getX();
				mezi.bitmapY = event.getY();
				//调用重绘方法
				mezi.invalidate();
				return true;
			}
		});
		
		frame.addView(mezi);
		
	}
}
