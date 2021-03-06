package com.example.frame;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnTouchListener;
import android.widget.FrameLayout;

public class MainActivity extends Activity {

	@SuppressLint("ClickableViewAccessibility")
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
		//定义变量
		FrameLayout frame = (FrameLayout) findViewById(R.id.Frame);  
        final MeziView mezi = new MeziView(MainActivity.this);  
        
       //为我们的图像添加触摸事件监听器  
        mezi.setOnTouchListener(new OnTouchListener() {  
            @Override  
            public boolean onTouch(View view, MotionEvent event) {  
                //设置妹子显示的位置  
                mezi.bitmapX = event.getX() - 100 ;  
                mezi.bitmapY = event.getY() - 100 ;  
                //调用重绘方法  
                mezi.invalidate();  
                return true;  
            }  
        });  
        frame.addView(mezi);  
	}

	
}
