<template>
  <div class="notificationHolder">
      <div class="notif-container top right">
          <Notification v-for='noti in notilist_TR'
              :key="noti._id"
              v-bind:message='noti.descryption'
              v-bind:type='noti.type'
              v-on:dismissed='dismissNotifications(noti)'
              v-bind:duration='noti.duration'>
          </Notification>
      </div> 
      <div class="notif-container top left">
          <Notification v-for='noti in notilist_TL'
              :key="noti._id"
              v-bind:message='noti.descryption'
              v-bind:type='noti.type'
              v-on:dismissed='dismissNotifications(noti)'
              v-bind:duration='noti.duration'>
          </Notification>
      </div> 
      <div class="notif-container bottom right">
          <Notification v-for='noti in notilist_BR'
              :key="noti._id"
              v-bind:message='noti.descryption'
              v-bind:type='noti.type'
              v-on:dismissed='dismissNotifications(noti)'
              v-bind:duration='noti.duration'>
          </Notification>
      </div> 
      <div class="notif-container bottom left">
          <Notification v-for='noti in notilist_BL'
              :key="noti._id"
              v-bind:message='noti.descryption'
              v-bind:type='noti.type'
              v-on:dismissed='dismissNotifications(noti)'
              v-bind:duration='noti.duration'>
          </Notification>
      </div> 
      <!-- <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">Launch demo modal</button> -->
  <section v-show='showmodal'>
   <!-- Modal -->
    <div class="modal fade in" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: block;">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" @click='hideModal' data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">Special Notification</h4>
          </div>
          <div class="modal-body">
            <div v-for='noti in notilist_Modal'
              :key="noti._id">
              {{noti.descryption}}
            </div>
          </div>
        </div>
      </div>
    </div> 
   <div  class='modal-backdrop fade in'></div>
  </section>
  </div>
</template>

<script>
import Notification from './Notification';
const API_URL = process.env.API_URL;

export default {
  name: 'notificationHolder',
    props: {
        notiPos: ''
    },

  data () {
    return {
    notilist_TR:[],
    notilist_TL:[],
    notilist_BR:[],
    notilist_BL:[],
    notilist_Modal:[],
    showmodal:false
    }
  },
  methods: {
        pollingUpdate:function(){
            // console.log('   polling update')
            this.fetchNotifications();
            setTimeout(() => {this.pollingUpdate()},10*1000) //polling every 10sec

        },
        hideModal: function(){
            var parent = this;
            this.showmodal=false;
            this.notilist_Modal.forEach(function(element){
                parent.dismissNotifications(element);    
            })

        },
        containsObject: function (obj, list) {
            var i;
            for (i = 0; i < list.length; i++) {
                if (list[i]._id === obj._id) {
                    return true;
                }
            }
            return false;
        },
        fetchNotifications: function(){
            var parent = this;
            var query = {notified:false};
            this.$http.get(API_URL+'/notification/get/',{params:query})
            .then(function(response){
                response.data.forEach(function(element){
                    if(element.type!='special') // not notified
                    {
                        if(element.position=='TR'){
                            if(!parent.containsObject(element,parent.notilist_TR))
                            {
                                parent.notilist_TR.push(element)

                            }                        }
                        else if(element.position=='TL')
                        {
                            if(!parent.containsObject(element,parent.notilist_TL))
                            {
                                parent.notilist_TL.push(element)

                            }
                        }
                        else if(element.position=='BR')
                        {
                            if(!parent.containsObject(element,parent.notilist_BR))
                            {
                                parent.notilist_BR.push(element)

                            }
                        }
                        else //BL
                        {
                            if(!parent.containsObject(element,parent.notilist_BL))
                            {
                                parent.notilist_BL.push(element)

                            }
                        }
                    }else 
                    {
                        if(!parent.containsObject(element,parent.notilist_Modal))
                        {
                            console.log(JSON.stringify(element))
                            parent.notilist_Modal.push(element);
                            parent.showmodal=true;
                        }
                    }
                })
                //parent.notilist = response.data;
                //push
                console.log(response.data)
            },error=>{

            });
        },
        dismissNotifications: function(item){
            console.log('dismissed ',item._id);
            var parent = this;
            this.$http.get(API_URL+'/notification/dismiss/'+item._id)
            .then(function(response){
                console.log(response)
            },error=>{

            });
        }
  },
  created: function() {
      this.pollingUpdate();
  },
  components:{
    Notification
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.right {
    position: absolute;
    right: 0px;
    width: 300px;
    /* border: 3px solid #73AD21; */
    padding: 10px;
}


.left {
    position: absolute;
    left: 0px;
    width: 300px;
    /* border: 3px solid #73AD21; */
    padding: 10px;
}

.top {
    position: absolute;
    top: 0px;
    width: 300px;
    /* border: 3px solid #73AD21; */
    padding: 10px;
}
.bottom {
    position: absolute;
    bottom: 0px;
    width: 300px;
    /* border: 3px solid #73AD21; */
    padding: 10px;
}

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
