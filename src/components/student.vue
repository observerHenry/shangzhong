<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml" >

       <router-view style="width: 100%"></router-view >

</template >

<script >
    import Vue from 'vue'
    var _this

    export default {
	    name: "system",
	    components: {},
	    data () {
		    _this = this;
		    return {
			    userinfo: {},
		    }
	    },
	    methods: {
		    handleSelect(key, keyPath) {
			    _this.$router.push(key)
		    },
		    getIndex(item, list)
		    {
			    return list.indexOf(item);
		    }
	    },
	    computed: {},
	    created: function () {
		    this.userinfo = JSON.parse(sessionStorage.getItem('user'));
            // console.log(`routes:\r\n${JSON.stringify(_this.$router.options.routes)}`)
	    },
	    mounted: function () {

	    },
    }

</script >

