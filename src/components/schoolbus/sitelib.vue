<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div style="width: 100%;height: 100%;padding: 24px" >
        <el-row >
            <el-col :span="2">
                <div style="margin: 10px;">
                    <span style="font-weight: 600;color:#5D5D5D;font-size: 15px">站点列表</span >
                </div>
            </el-col >
            <el-col :span="2" :offset="18" >
                <el-button
                        icon="el-icon-download"
                        size="normal"
                        type="primary"
                        style="text-align: right;color: white;"
                        @click="onImport" >导入
                </el-button >
            </el-col >
            <el-col :span="1" style="margin-left: 20px">
                <el-button
                        icon="el-icon-upload2"
                        size="normal"
                        type="primary"
                        style="text-align: right"
                        @click="onExport" >导出
                </el-button >
            </el-col >
        </el-row >
        <el-row class="well" style="background-color: white;margin-top: 20px;">
            <el-row>
                <el-col :span="3" style="text-align: center;margin-top: 10px">
                    <div style="width: 200px;" >
                        <el-button

                                icon="el-icon-plus"
                                size="normal"
                                type="primary"
                                @click="onAdd" >添加站点
                        </el-button >
                    </div >
                </el-col>
                <el-col :span="1" style="text-align: center;margin-top: 10px">
                    <el-button
                            icon="el-icon-delete"
                            type="danger"
                            @click="onDeleteMore">
                    </el-button >
                </el-col >
                <el-col :span="20">
                    <div style="text-align: left" >
                        <el-row style="margin-top: 10px;margin-bottom: 20px">
                            <el-col :span="5" :offset="16" >
                                <el-input v-model="queryKey"
                                          placeholder="输入关键字查询" clearable
                                          auto-complete="off" ></el-input >
                            </el-col >
                            <el-col :span="1" style="margin-left: 10px" >
                                <el-button
                                        type="primary"
                                        icon="el-icon-search"
                                        @click="search" >搜索
                                </el-button >
                            </el-col >
                        </el-row >
                    </div >
                </el-col>
            </el-row>
            <el-table
                    v-loading="loadingUI"
                    element-loading-text="获取数据中..."
                    :data="tableData"
                    @selection-change="handleSelectionChange"
                    :default-sort="{prop: 'number', order: 'descending'}"
                    border
                    highlight-current-row
                    empty-text="暂无数据..."
                    show-overflow-tooltip="true"
                    style="width: 100%;" >
                <el-table-column
                        width="75"
                        align="center"
                        type="selection" >
                </el-table-column >
                <el-table-column
                        align="center"
                        prop="stationName"
                        sortable
                        label="站点" >
                </el-table-column >
                <el-table-column
                        align="center"
                        prop="gpsInfo"
                        sortable
                        label="GPS" >
                </el-table-column >
                <el-table-column
                        align="center"
                        width="200"
                        label="操作" >
                    <template scope="scope" >
                        <el-tooltip placement="top" content="修改" >
                            <el-button
                                    size="mini"
                                    type="primary"
                                    icon="el-icon-edit"
                                    @click="onUpdate(scope.row)" >
                            </el-button >
                        </el-tooltip >
                        <el-tooltip placement="top" content="删除" >
                            <el-button
                                    size="mini"
                                    type="danger"
                                    icon="el-icon-delete"
                                    @click="onDelete(scope.row)" >
                            </el-button >
                        </el-tooltip >
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
        </el-row >
        <el-dialog title="提示" :visible.sync="deleteConfirmDialog"
                   append-to-body width="30%" >
            <span >确认要删除选定的站点吗？</span >
            <span slot="footer" class="dialog-footer" >
              <el-button class="speacial-button" @click="deleteConfirmDialog = false"
                         icon="el-icon-close" >取 消</el-button >
              <el-button type="primary" @click="onConfirmDelete" icon="el-icon-check" >确 定</el-button >
            </span >
        </el-dialog >
    </div >
</template>

<script>
    var _this;
    import request from '../../api/request'
    export default {
        name: "SiteLib",
        components: {},
        data () {
            _this = this;
            return {
                queryKey: '',
                pageSize: EveryPageNum,//每一页的num
                currentPage: 1,
                startRow: 0,
                totalRecords: 0,
                loadingUI: false,
                tableData: [],
                multipleSelection: [],
                regionData: {
                    selectId: "0",
                    selectName: '',
                    subList: RegionList,
                },
                deleteConfirmDialog: false,
                selectedItem: {},
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.currentPage = val;
                this.search();
            },
            search() {
                _this.loadingUI = true;
                let condition = {
                    page: _this.currentPage,
                    size: _this.pageSize,
                }
                let params = new URLSearchParams();
                if (condition) {
                    let keys = Object.keys(condition);
                    for (let key of keys) {
                        params.append(key, condition[key]);
                    }
                }
                request({
                    url: '/bus/stations/list',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.tableData = res.data.data.list;
                        _this.totalRecords = res.data.data.total;
                        _this.startRow = res.data.data.startRow;
                    }
                    else {
                        showMessage(_this,"获取数据失败！");
                    }
                    // _this.multipleSelection = [];
                    _this.loadingUI = false;


                }).catch(error => {
                    console.log(error)
                    _this.loadingUI = false;

                })

            },

        },
        computed: {

        },

        filters: {},

        created: function () {


        },
        mounted: function () {
            _this.search();
        }
    }
</script>
<style>

</style>
