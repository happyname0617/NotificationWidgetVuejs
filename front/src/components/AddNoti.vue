<template>
    <div class='addnoti'>
        <NotificationHolder>
        </NotificationHolder>

        <div class='col-sm-4 col-sm-offset-4'>
            <h2>Insert new Notification to Server</h2>
            <p>it would takes 10 - 20sec to get notification from the server(polling interval)</p>
            <div class="alert alert-danger" v-if="error">
                <p>{{ error }}</p>
            </div>
            <div class="form-group">
                <input
                type="text"
                class="form-control"
                placeholder="notification message"
                v-model="noti.descryption">
            </div>
            <div class="form-group">
                <label>duration</label>
                <input
                type="Number"
                class="form-control"
                placeholder="10"
                min =0
                max = 60
                v-model="noti.duration">
            </div>
            <div class="form-group">
                <select v-model='noti.type'>
                    <option value='alert' selected>alert</option>
                    <option value='info'>info</option>
                    <option value='warning'>warning</option>
                    <option value='special'>special</option>
                </select>
            </div>
            <div class="form-group">
                <select v-model='noti.position'>
                    <option value='TR'>top right</option>
                    <option value='TL'>top left</option>
                    <option value='BR'>bottom right</option>
                    <option value='BL'>bottom left</option>
                </select>
            </div>

            <!-- @click is the same as v-on:click -->
            <button class="btn btn-success" @click="addNotification()">submit</button>
        </div>
    </div>
</template>

<script>
import NotificationHolder from './NotificationHolder';

const API_URL = process.env.API_URL;
export default {
    name: 'addnoti',
	data(){
		return {
			noti: {
				descryption: 'test message',
                type: 'info',
                position:'TR',
                duration:60

            },
			error: ''
		}
    },
    components:{
        NotificationHolder
    },

	methods: {
        addNotification: function () {
            var parent = this;
            var newNotification = {
                descryption: this.noti.descryption,
                type:this.noti.type,
                position: this.noti.position,
                duration:this.noti.duration
            }   
            console.log('addNotification',newNotification)

            this.$http.post(API_URL+'/notification/add',newNotification)
                .then(function(response){
                    parent.noti.descryption = ''
                    console.log(response.data);
                    //alert(response.body.msg)
                    },error=>{
                        console.log(error)
                    }
                );
                
            
        }
	}
}
</script>