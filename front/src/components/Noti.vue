<template>
    <div class="notification alert alert-dismissible" v-bind:class='classtype'>
      <!-- <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> -->
    {{message}}
    </div>
</template>

<script>
export default {
  name: 'notification',
  props: ['message','notiType'],
  data () {
    return {
    }
  },
  computed:{
      classtype: function(){
        console.log(this.notiType)

        if(this.notiType=='warning')
        {
            return {'alert-warning':true}
        }
        else if(this.notiType=='info')
        {
            return {'alert-info':true}
        }
        else 
        {
            return {'alert-success':true}
        }

        }
  },
  created:function()
  {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>