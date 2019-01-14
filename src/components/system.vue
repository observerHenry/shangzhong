<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml" >
        <el-main style="width: 100%">
            <!--<el-tabs v-model="activeName" @tab-click="handleSelect" >-->
                 <!--<div v-for="root in $router.options.routes" v-if="!root.hidden" >-->
                    <!--<div v-for="sub in root.children" v-if="!sub.hidden" >-->
                        <!--<el-tab-pane :label="item.meta" :name="item.path" v-if="sub.path == '/home/system'">-->
                            <!--<router-view ></router-view >-->
                        <!--</el-tab-pane >-->
                    <!--</div >-->
                 <!--</div >-->
            <!--</el-tabs >-->
            <router-view ></router-view >
        </el-main >
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
			    activeName: "",
		    }
	    },
	    methods: {
		    handleSelect(key, keyPath) {
			    _this.activeName = key;
			    //_this.$router.push(key)
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

