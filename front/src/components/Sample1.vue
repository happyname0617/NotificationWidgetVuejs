


<template>
  <div class="sample1">
    <NotificationHolder>
    </NotificationHolder>
    <h2>Sample page 1</h2>
  </div>
</template>

<script>
import NotificationHolder from './NotificationHolder';

export default {
  name: 'sample1',
  data () {
    return {
    }
  },
    components:{
    NotificationHolder
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
