<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div style="width: 100%">
        <el-row>
            <el-col :span="2">
                <span>校车列表</span>
            </el-col>
            <el-col :span="3" :offset="16">
                <el-button
                        icon="el-icon-download"
                        size="normal"
                        type="primary"
                        style="text-align: right"
                        @click="search">导入数据
                </el-button>
            </el-col>
            <el-col :span="3">
                <el-button
                        icon="el-icon-upload2"
                        size="normal"
                        type="primary"
                        style="text-align: right"
                        @click="search">上传数据
                </el-button>
            </el-col>
        </el-row>
        <el-row>
            <table style="margin-top: 10px;width: 100%;height: 100%;">
                <tr style="height: 90px;">
                    <td style="width: 220px;">
                        <el-button
                                icon="el-icon-plus"
                                size="normal"
                                type="primary"
                                style="text-align: right"
                                @click="search">添加校车
                        </el-button>
                    </td>
                    <td style="text-align: left">
                        <el-row>
                            <el-col :span="1">
                                <el-button
                                        icon="el-icon-delete"

                                        type="default"
                                >
                                </el-button>
                            </el-col>
                            <el-col :span="14" :offset="6">
                                <el-input v-model="queryKey"
                                          placeholder="输入关键字查询" clearable
                                          auto-complete="off"></el-input>
                            </el-col>
                            <el-col :span="1">
                                <el-button
                                        icon="el-icon-search"
                                        type="default"
                                        @click="search">搜索
                                </el-button>
                            </el-col>

                        </el-row>
                    </td>
                </tr>
                <tr>
                    <td style="width: 220px;">
                        <el-menu v-for="root in regionList"
                                 style="background-color: transparent;text-align: left"
                                 :default-active="root.path" @select="handleSelect" >
                            <el-menu-item v-for="item in sub.children" :index="item.path"
                                          style="text-align: left;font-size: 14px; font-weight: bold" >
                                {{item.meta}}
                            </el-menu-item >
                        </el-menu >
                    </td>
                    <td>
                        <el-table
                                v-loading="loadingUI"
                                element-loading-text="获取数据中..."
                                :data="tableData"
                                :default-sort="{prop: 'isOldMachine', order: 'descending'}"
                                border
                                highlight-current-row
                                empty-text="暂无数据..."
                                show-overflow-tooltip="true"
                                style="width: 100%; ">
                            <el-table-column
                                    width="75"
                                    align="center"
                                    type="selection">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="bus"
                                    sortable
                                    label="校车">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="nameplate"
                                    sortable
                                    label="早/午区间">
                                <template scope="scope">
                                    <div>
                                        {{scope.row.id}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="photo"
                                    label="供应商">
                                <template scope="scope">
                                    <div>
                                        {{scope.row.photo}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="BusMom"
                                             align="center"
                                             sortable
                                             prop="name">
                                <template scope="scope">
                                    <div>
                                        {{scope.row.name}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    label="操作">
                                <template scope="scope">
                                    <el-tooltip placement="top" content="详情" >
                                        <el-button
                                                size="mini"
                                                type="primary"
                                                icon="el-icon-edit"
                                                @click="editWithItem(scope.row)" >
                                        </el-button >
                                    </el-tooltip >
                                    <el-tooltip placement="top" content="派单" >
                                        <el-button
                                                size="mini"
                                                type="success"
                                                icon="el-icon-delete"
                                                @click="assignTask(scope.row)" >
                                        </el-button >
                                    </el-tooltip >
                                </template>
                            </el-table-column>
                        </el-table>
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
                    </td>
                </tr>
            </table>
        </el-row>
    </div>
</template>

<script>
    var _this;
    export default {
        name: "BusManage",
        components: {},
        data() {
            _this = this;
            return {
                queryKey: '',
                pageSize: EveryPageNum,//每一页的num
                currentPage: 1,
                startRow: 0,
                totalRecords: 0,
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.currentPage = val;
                this.search();
            },
            search() {

            },
            handleSelect()
            {

            },
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
