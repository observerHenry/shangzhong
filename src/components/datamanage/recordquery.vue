<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div style="width: 100%">
        <el-form :model="condition" label-position="right">
            <el-row>
                <el-col :span="12" >
                    <el-date-picker
                            v-model="condition.selectDate"
                            type="daterange"
                            align="left"
                            unlink-panels
                            range-separator="—"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                </el-col>
                <el-col :span="8" :offset="1" >
                    <el-input :span="3" v-model="condition.nameplate"
                          placeholder="机器编号" clearable
                          auto-complete="off"></el-input>
                </el-col>
                <el-col :span="2" :offset="1" >
                    <el-button
                            icon="el-icon-search"
                            size="normal"
                            type="primary"
                            @click="search" >查询
                    </el-button >
                </el-col >

            </el-row>
            <el-row style="margin-top: 10px;">
                <el-col :span="4" >
                    <el-form-item label="" >
                        <el-select v-model="condition.status" clearable placeholder="请选择校车">
                            <el-option
                                    v-for="item in statusList"
                                    :value="item.value"
                                    :label="item.name" >
                            </el-option >
                        </el-select >
                    </el-form-item >
                </el-col >
                <el-col :span="8" :offset="1">
                    <el-form-item label="" >
                        <el-select v-model="condition.status" clearable placeholder="请选择站点">
                            <el-option
                                    v-for="item in statusList"
                                    :value="item.value"
                                    :label="item.name" >
                            </el-option >
                        </el-select >
                    </el-form-item >
                </el-col >
                <el-col :span="4" :offset="2">
                    <el-form-item label="" >
                        <el-select v-model="condition.status" clearable placeholder="请选择年级">
                            <el-option
                                    v-for="item in statusList"
                                    :value="item.value"
                                    :label="item.name" >
                            </el-option >
                        </el-select >
                    </el-form-item >
                </el-col >
                <el-col :span="4" :offset="1">
                    <el-form-item label="" >
                        <el-select v-model="condition.status" clearable placeholder="请选择班级">
                            <el-option
                                    v-for="item in statusList"
                                    :value="item.value"
                                    :label="item.name" >
                            </el-option >
                        </el-select >
                    </el-form-item >
                </el-col >
            </el-row>
        </el-form>
        <div>为你查询到{{totalRecords}}条符合条件的记录</div>
        <el-row>
            <el-table
                    v-loading="loadingUI"
                    element-loading-text="获取数据中..."
                    :data="tableData"
                    :default-sort="{prop: 'isOldMachine', order: 'descending'}"
                    border
                    highlight-current-row
                    empty-text="暂无数据..."
                    show-overflow-tooltip="true"
                    style="width: 100%; " >
                <!--<el-table-column-->
                        <!--width="75"-->
                        <!--align="center"-->
                        <!--label="序号" >-->
                    <!--<template scope="scope" >-->
                        <!--{{scope.$index+startRow}}-->
                    <!--</template >-->
                <!--</el-table-column >-->
                <el-table-column
                        width="75"
                        align="center"
                        type="selection">
                </el-table-column >
                <el-table-column
                        align="center"
                        prop="nameplate"
                        sortable
                        label="时间" >
                    <template scope="scope" >
                        <div >
                            {{scope.row.id}}
                        </div >
                    </template >
                </el-table-column >
                <el-table-column
                        align="center"
                        prop="photo"
                        label="校车" >
                    <template scope="scope" >
                        <div >
                            {{scope.row.photo}}
                        </div >
                    </template >
                </el-table-column >
                <el-table-column label="站点"
                                 align="center"
                                 sortable
                                 prop="name" >
                    <template scope="scope" >
                        <div >
                            {{scope.row.name}}
                        </div >
                    </template >
                </el-table-column >
                <el-table-column
                        align="center"
                        prop="class"
                        sortable
                        label="班级" >
                </el-table-column >
                <el-table-column
                        align="center"
                        prop="bus"
                        sortable
                        label="姓名" >
                </el-table-column >
                <el-table-column
                        align="center"
                        sortable
                        label="状态" >
                    <template scope="scope" >
                        <div >
                            {{scope.row.name}}
                        </div >
                    </template >
                </el-table-column >
            </el-table >
            <div class="block" style="text-align: center; margin-top: 20px" >
                <el-pagination
                        background
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="totalRecords" >
                </el-pagination >
            </div >
        </el-row>
    </div>
</template>

<script>
    var _this;
    export default {
        name: "RecordQuery",
        components: {},
        data() {
            _this = this;
            return {
                condition: {},
                pageSize: EveryPageNum,//每一页的num
                currentPage: 1,
                startRow: 0,
                totalRecords: 0,
            }
        },
        methods: {
            search()
            {

            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.search();
            },
        },
        computed: {},

        filters: {},

        created: function () {


        },
        mounted: function () {
        }
    }
</script>
<style>
    .el-select{
        width: 100%;
    }
</style>
