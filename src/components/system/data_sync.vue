<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div style="padding: 20px">
        <el-tabs type="border-card" :value="activeTab">
            <el-tab-pane label="学生信息">

            </el-tab-pane>
            <el-tab-pane label="班级信息">

            </el-tab-pane>
            <el-tab-pane label="学生照片">
                <el-row>
                    <el-col :span="2">
                        <el-button type="primary" icon="el-icon-sort" @click="stuPicSync()">同步</el-button>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 20px;margin-left: -60px">
                    <el-col :span="2" style="text-align: right;font-size: 14px;font-weight: bolder;color: #909399">平台学生数：</el-col>
                    <el-col :span="1" style="text-align: left;font-size: 20px;font-weight: bolder;color: #1875F0;margin-top: -5px">{{platformStuNum}}</el-col>
                    <el-col :span="2" style="text-align: right;font-size: 14px;font-weight: bolder;color: #909399">人像平台学生数：</el-col>
                    <el-col :span="1" style="text-align: left;font-size: 20px;font-weight: bolder;color: #1875F0;margin-top: -5px">{{facePlatformStuNum}}</el-col>
                </el-row>
                <el-row style="margin-top: 10px"
                        v-loading="stuPicSyncLogLoading"
                        element-loading-text="学生照片同步中"
                        element-loading-spinner="el-icon-loading">
                    <el-input
                            type="textarea"
                            :rows="30"
                            placeholder="同步日志输出..."
                            readonly
                            v-model="stuPicSyncLog">
                    </el-input>
                </el-row>

            </el-tab-pane>
            <el-tab-pane label="BusMom照片">

            </el-tab-pane>
            <el-tab-pane label="校车信息">

            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    var _this;
    export default {
        name: "DataSync",
        components: {},
        data () {
            _this = this;
            return {
                activeTab:"2",
                platformStuNum:100,
                facePlatformStuNum:80,
                stuPicSyncLog:"",
                stuPicSyncLogLoading:false,
            }
        },
        methods: {
            stuPicSync() {

            },
            getPlatformStuNum() {

            },
            getFacePlatformStuNum() {

            },

        },
        computed: {

        },

        filters: {},

        created: function () {


        },
        mounted: function () {
            _this.getPlatformStuNum();
            _this.getFacePlatformStuNum();

        }
    }
</script>
<style>

</style>
