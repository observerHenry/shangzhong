<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml" >
    <el-container>
        <el-header style="background-color: transparent; padding: 0px;" height="90px">
            <div v-for="root in $router.options.routes" v-if="!root.hidden">
                <el-menu v-for="sub in root.children" v-if="!sub.hidden" mode="horizontal" :default-active="$route.path"
                         text-color="#909399"
                         active-text-color="#1875F0"
                         @select="handleSelect">
                    <el-menu-item v-for="item in sub.children"
                                  :index="item.path"
                                  v-if="sub.path == '/home/system' "
                                  style="text-align: center; font-size: 15px; font-weight: bold;height: 90px;line-height: 90px;margin-right: 36px;margin-left: 36px ">
                        {{item.meta}}
                    </el-menu-item>
                </el-menu>
            </div>
        </el-header>
            <router-view style="margin: 0px"></router-view>
    </el-container>
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

