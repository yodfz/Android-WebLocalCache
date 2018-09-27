package com.example.administrator.weblocalcache;

import android.content.Context;
import android.text.TextUtils;
import android.webkit.WebResourceResponse;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

public class localCache {

    private Map<String, String> mMap;

    public localCache() {
        mMap = new HashMap<>();
        initData();
    }

    private void initData() {
        String imageDir = "images/";
        mMap.put("https://www.yodfz.com/upload/20180915/1537004124000.png",
                "1537004124000.png");
        mMap.put("https://www.yodfz.com/static/images/zfb.jpg",
                "zfb.jpg");
        mMap.put("https://www.yodfz.com/js/prism.js",
                "prism.js");
    }

    public boolean hasLocalResource(String url) {
        return mMap.containsKey(url);
    }

    public WebResourceResponse getReplacedWebResourceResponse(Context context, String url) {
        String localResourcePath = mMap.get(url);
        if (TextUtils.isEmpty(localResourcePath)) {
            return null;
        }
        InputStream is = null;
        try {
            is = context.getApplicationContext().getAssets().open(localResourcePath);
        } catch (Exception e) {
            System.out.println("getReplacedWebResourceResponse error:" + localResourcePath);
            e.printStackTrace();
            return null;
        }
        String mimeType ="";
        if (url.endsWith(".css")) {
            mimeType = "text/css";
        }
        if (url.endsWith(".jpg")) {
            mimeType = "image/jpeg";
        }
        if (url.endsWith(".png")) {
            mimeType = "image/png";
        }
        if (url.endsWith(".png")) {
            mimeType = "image/png";
        }
        if (url.endsWith(".js")) {
            mimeType = "application/javascript";
        }
        WebResourceResponse response = new WebResourceResponse(mimeType, "utf-8", is);
        return response;
    }

}
