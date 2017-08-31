<template>
    <div>
        <div v-if="self_show">
            <div class="alert" :class="classObj(self_type)">
                    <p>{{ self_body }}</p>
            </div>
        </div>

    </div>
</template>

<style scoped>

</style>

<script>
export default {
    props: {
        message: '',
        type: {default: 'info'},
        duration: null
    },
    data() {
        return {
            self_body: this.message,
            self_type: this.type,
            self_duration: this.duration,
            self_show: true
        }
    },
    created() {
        if (this.self_duration !== undefined) {
            setTimeout(() => {
                this.self_show = false;
                this.$emit('dismissed')
            }, this.self_duration * 1000)
        }
    },
    methods: {
        classObj(type) {
            if(type=='alert')
            {
                return 'alert-success'
            }
            else
            {
                return `alert-${type}`
            }
        }
    }
}
</script>