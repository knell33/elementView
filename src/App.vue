<template>
<div id="app">
    <!-- 需要缓存的视图组件 --> 
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
     <!-- 不需要缓存的视图组件 -->
     <router-view v-if="!$route.meta.keepAlive"></router-view>
</div>
</template>

<script>
export default {
    name: 'app'

}
</script>

<style>

</style>
