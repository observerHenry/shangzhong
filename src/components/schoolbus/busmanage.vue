<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml" >
    <div >
        <el-row>
            <el-col>
                <span :span="2" >校车列表</span >
                <el-button
						:offset="18"
		                :span="2"
		                icon="el-icon-download"
		                size="normal"
		                type="primary"
		                style="text-align: right"
		                @click="search" >导入数据
                </el-button >
	            <el-button
			            :offset="1"
			            :span="2"
			            icon="el-icon-upload2"
			            size="normal"
			            type="primary"
			            style="text-align: right"
			            @click="search">上传数据
	            </el-button>
            </el-col >
        </el-row >
    </div >
</template >

<script >
    var _this;
    export default {
	    name: "BusManage",
	    components: {},
	    data () {
		    _this = this;
		    return {}
	    },
	    methods: {},
	    computed: {},

	    filters: {},

	    created: function () {


	    },
	    mounted: function () {
	    }
    }
</script >
<style >

</style >
