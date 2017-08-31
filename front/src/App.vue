<template>
  <div id="app">
     <nav class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          </button>
          <a class="navbar-brand" href="#">lokalportal</a>
        </div>
        <ul class="nav navbar-nav">
          <li><router-link to='/'>Add Notification</router-link></li>
          <li><router-link to='/sample1'>sample page 1</router-link></li>
          <li><router-link to='/sample2'>sample page 2</router-link></li>
        </ul>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
