package com.notification;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;

public class SplashScreen extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash_screen);
        pauseScreen();
    }

    private void pauseScreen() {
        new Handler().postDelayed(new Runnable()
        {
            @Override
            public void run() {

                startActivity(new Intent(SplashScreen.this,MainActivity.class));
                finish();

            }
        },5000);
    }
}