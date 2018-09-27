package com.example.administrator.weblocalcache;

import android.annotation.TargetApi;
import android.os.Build;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends AppCompatActivity {
    private static WebView webviewContent;
    private static localCache _localCache;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        // 创建一个webView
        System.out.println("webView laod");
        webviewContent = (WebView) findViewById(R.id.web_view);
        _localCache = new localCache();
        webviewContent.setWebViewClient(new WebViewClient() {
            // 设置不用系统浏览器打开,直接显示在当前Webview
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return true;
            }

            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, String url) {
                // 如果命中本地资源, 使用本地资源替代
                System.out.println(url);
                if (_localCache.hasLocalResource(url)) {
                    WebResourceResponse response =
                            _localCache.getReplacedWebResourceResponse(getApplicationContext(),
                                    url);
                    if (response != null) {
                        return response;
                    }
                }
                return super.shouldInterceptRequest(view, url);
            }

            @TargetApi(Build.VERSION_CODES.LOLLIPOP)
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view,
                                                              WebResourceRequest request) {
                String url = request.getUrl().toString();
                if (_localCache.hasLocalResource(url)) {
                    WebResourceResponse response =
                            _localCache.getReplacedWebResourceResponse(getApplicationContext(),
                                    url);
                    if (response != null) {
                        return response;
                    }
                }
                return super.shouldInterceptRequest(view, request);
            }

        });
        webviewContent.loadUrl("https://www.yodfz.com/detail/28/Http%E5%8D%8F%E8%AE%AE%E7%BC%93%E5%AD%98%E4%BA%86%E8%A7%A3%E4%B8%80%E4%B8%8B.html");

    }

    public static WebView getWebView() {
        return webviewContent;
    }

    public static void destroyWebView(WebView webView) {
        if (webView != null) {
            webView.loadDataWithBaseURL(null, "", "text/html", "utf-8", null);
            webView.clearHistory();
            webView.destroy();
        }
    }
}
