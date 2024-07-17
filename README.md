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
Provide an object with the used cookieIds (GoogleAnalytics, Hotjar ). Anyplace and anytime you want. 

````vue
<script setup>
    
import { useCookieControl } from 'abiturma-vue-3-cookie-control'    
    
const { initialize } = useCookieControl()
    
initialize({
    gaId: 'GT-XXXXXXX',
    hjId: 'HJ-XXXXXXX'
})    
</script>
````

## Step 3
Listen on accepted Cookies if necessary

````vue

<script setup>
    
import { useCookieControl } from 'abiturma-vue-3-cookie-control'    
    
const { onAccepted } = useCookieControl()
    
onAccepted((cookie) => {
    if(cookie.id === 'google-analytics') {
        // initialize google-analytics
    }
})    
    
</script>
````
## Step 4
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
