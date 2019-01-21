<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div style="width: 100%;height: 100%;padding: 24px">
        <el-row>
            <el-col :span="2">
                <div style="margin: 10px;">
                    <span style="font-weight: 600;color:#5D5D5D;font-size: 15px">变更列表</span >
                </div>
            </el-col >
        </el-row>
        <el-row style="margin-top: 20px;background: white" class="well" >
            <el-col :span="23" style="background: white;margin-left: 30px;text-align: center">
                <el-row>
                    <el-col :span="1" :offset="20">
                        <i class="el-icon-plus"></i>
                    </el-col>
                    <el-col :span="1">
                        <i class="el-icon-edit"></i>
                    </el-col>
                    <el-col :span="1">
                        <i class="el-icon-delete"></i>
                    </el-col>
                </el-row>
                <el-table
                        v-loading="loadingUI"
                        element-loading-text="获取数据中..."
                        :data="tableData"
                        border
                        highlight-current-row
                        empty-text="暂无数据..."
                        show-overflow-tooltip="true"
                        style="width: 100%; margin-top: 10px" >
                    <el-table-column
                            width="75"
                            align="center"
                            type="selection">
                    </el-table-column >

                    <el-table-column
                            align="center"
                            sortable
                            label="变更日期" >
                        <template scope="scope" >
                            <div >
                                {{scope.row.changeDate}}
                            </div >
                        </template >
                    </el-table-column >
                    <el-table-column
                            align="center"
                            prop="name"
                            width="100"
                            label="学生姓名">
                    </el-table-column >
                    <el-table-column
                            label="原校车"
                             align="center"
                             prop="originalBus" >
                    </el-table-column >
                    <el-table-column
                            align="center"
                            prop="currentBus"
                            label="新校车" >
                    </el-table-column >
                    <el-table-column
                            align="center"
                            width="200"
                            label="站点" >
                        <template scope="scope" >
                            <div >
                                {{scope.row.busStation}}
                            </div >
                        </template >
                    </el-table-column >
                    <el-table-column
                            align="center"
                            prop="content"
                            label="变更内容" >
                    </el-table-column >
                    <el-table-column
                            align="center"
                            label="是否确认"
                            width="150" >
                        <template scope="scope" >
                            <el-tag  type="success" v-if="scope.row.confirmed">YES</el-tag>
                            <el-tag  type="danger"  v-if="!scope.row.confirmed">NO</el-tag>
                        </template >
                    </el-table-column >
                </el-table >
                <el-pagination
                        style="margin-top: 20px"
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage3"
                        :page-size="8"
                        layout="prev, pager, next, jumper"
                        :total="88">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    var _this;
    export default {
        name: "ChangeMange",
        components: {},
        data () {
            _this = this;
            return {
                tableData: [
                    {
                        changeDate:"2019-01-16",
                        name:"刘德华",
                        originalBus:"1号校车",
                        currentBus:"2号校车",
                        busStation:"西藏北路柳营路/西藏北路苏北路",
                        content:"学生家庭地址变更",
                        confirmed:false
                    },
                    {
                        changeDate:"2019-01-15",
                        name:"胡通",
                        originalBus:"1号校车",
                        currentBus:"2号校车",
                        busStation:"西藏北路柳营路/西藏北路苏北路",
                        content:"学生家庭地址变更",
                        confirmed:true
                    },
                    {
                        changeDate:"2019-01-10",
                        name:"刘德华",
                        originalBus:"1号校车",
                        currentBus:"2号校车",
                        busStation:"西藏北路柳营路/西藏北路苏北路",
                        content:"学生家庭地址变更",
                        confirmed:true
                    },
                    {
                        changeDate:"2019-01-10",
                        name:"刘德华",
                        originalBus:"1号校车",
                        currentBus:"2号校车",
                        busStation:"西藏北路柳营路/西藏北路苏北路",
                        content:"学生家庭地址变更",
                        confirmed:false
                    },
                    {
                        changeDate:"2019-01-10",
                        name:"刘德华",
                        originalBus:"1号校车",
                        currentBus:"2号校车",
                        busStation:"西藏北路柳营路/西藏北路苏北路",
                        content:"学生家庭地址变更",
                        confirmed:false
                    },
                    {
                        changeDate:"2019-01-10",
                        name:"刘德华",
                        originalBus:"1号校车",
                        currentBus:"2号校车",
                        busStation:"西藏北路柳营路/西藏北路苏北路",
                        content:"学生家庭地址变更",
                        confirmed:false
                    },
                ],
            }
        },
        methods: {

        },
        computed: {

        },

        filters: {},

        created: function () {


        },
        mounted: function () {
        }
    }
</script>
<style>

</style>
