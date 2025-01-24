# Usage


## Step 1
Include the root element `<CookieControl>` in your app. 

````vue
<template>
    <div>
        ...
    </div>
    <CookieControl/>
</template>

<script setup>
    
import { CookieControl } from 'abiturma-vue-3-cookie-control'    
    
</script>
````
## Step 2
Add the path to the cookie bar to your `tailwind.config` file
````js
{
    //   ...
    content: [
      //  ...
        'node_modules/abiturma-vue-3-cookie-control/components/**/*.{js,vue}'
    ]
}

````

## Step 3
Include the GTM Tag in the base template 


## Step 4
That's it


