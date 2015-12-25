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
		
		//�������
		FrameLayout frame = (FrameLayout) findViewById(R.id.Frame);  
        final MeziView mezi = new MeziView(MainActivity.this);  
        
       //Ϊ���ǵ�ͼ�����Ӵ����¼�������  
        mezi.setOnTouchListener(new OnTouchListener() {  
            @Override  
            public boolean onTouch(View view, MotionEvent event) {  
                //����������ʾ��λ��  
                mezi.bitmapX = event.getX() - 100 ;  
                mezi.bitmapY = event.getY() - 100 ;  
                //�����ػ淽��  
                mezi.invalidate();  
                return true;  
            }  
        });  
        frame.addView(mezi);  
	}

	
}