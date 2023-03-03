package com.betrbeta; // replace com.your-app-name with your app’s name
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.Arguments;

import android.util.Log;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.content.res.Resources;
import android.content.Context;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.lang.String;
import java.util.Arrays;

public class PackageModule extends ReactContextBaseJavaModule {
    PackageModule(ReactApplicationContext context) {
       super(context);
   }

   @Override
   public String getName() {
    return "PackageModule";
    }

    @ReactMethod
    public void findPlayStoreApplication(Promise promise){
        try{
            final Intent mainIntent = new Intent(Intent.ACTION_MAIN, null);
            mainIntent.addCategory(Intent.CATEGORY_LAUNCHER);

            PackageManager manager = getReactApplicationContext().getPackageManager();

            //List of installers that came from Play Store
            List<String> validInstallers = new ArrayList<>(Arrays.asList("com.android.vending", "com.google.android.feedback"));

            //getReactApplicationContext == Context
            List<ResolveInfo> ril = manager.queryIntentActivities(mainIntent, 0);

            
            List<String> componentList = new ArrayList<String>();
            String name = null;
            int i = 0;

            String[] apps = new String[ril.size()];
            for (ResolveInfo ri : ril) {
                if (ri.activityInfo != null) {
                    // get package
                    Resources res = manager.getResourcesForApplication(ri.activityInfo.applicationInfo);
                    // if installer name
                    String installer = manager.getInstallerPackageName(ri.activityInfo.packageName);

                    //if installer is from playstore, append to the list
                    if(installer != null && validInstallers.contains(installer)){

                        if (ri.activityInfo.labelRes != 0) {
                            name = res.getString(ri.activityInfo.labelRes);
                        } else {
                            name = ri.activityInfo.applicationInfo.loadLabel(
                                manager).toString();
                        }
                        apps[i] = name;
                        i++;
                    }
                }
            }

            WritableArray promiseArray = Arguments.createArray();

            for(int j=0;j<i;j++){
                promiseArray.pushString(apps[j]);
            }
        
            promise.resolve(promiseArray);

        }catch(Exception e){
            promise.reject("Error returned from promise", e);
        }

    }
    


}

