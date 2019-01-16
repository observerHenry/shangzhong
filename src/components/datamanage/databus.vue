<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div style="width: 100%;height: 100%">
        <el-row>
            <el-date-picker
                    v-model="selectData"
                    type="date"
                    placeholder="选择日期">
            </el-date-picker>
        </el-row>
        <el-row style="margin-top: 10px;">
            <el-col :span="8">
                <table style="width: 350px;height: 420px;">
                    <tr style="text-align: left">
                        <td colspan="3">
					     <span class="span-normal">
					        早班统计
				         </span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <div>
                                <el-progress type="circle" :percentage="50"></el-progress>
                            </div>
                            <span class="span-normal">
						        早班乘坐统计
					         </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
							     <span class="span_number">
								     1021
							     </span>
                                <br>
                                <span class="span-normal">
								     应乘人数
							     </span>
                            </div>
                        </td>
                        <td>
                            <div>
							     <span class="span_number">
								     100
							     </span>
                                <br>
                                <span class="span-normal">
								     缺乘人数
							     </span>
                            </div>
                        </td>
                        <td>
                            <div>
							     <span class="span_number">
								     92%
							     </span>
                                <br>
                                <span class="span-normal">
								     乘车率
							     </span>
                            </div>
                        </td>
                    </tr>
                </table>
            </el-col>
            <el-col :span="8">
                <table style="width: 350px;height: 420px;">
                    <tr style="text-align: left">
                        <td colspan="3">
					     <span class="span-normal">
					        午班统计
				         </span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <div>
                                <el-progress type="circle" :percentage="80"></el-progress>
                            </div>
                            <span class="span-normal">
						        午班乘坐统计
					         </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
							     <span class="span_number">
								     998
							     </span>
                                <br>
                                <span class="span-normal">
								     应乘人数
							     </span>
                            </div>
                        </td>
                        <td>
                            <div>
							     <span class="span_number">
								     50
							     </span>
                                <br>
                                <span class="span-normal">
								     缺乘人数
							     </span>
                            </div>
                        </td>
                        <td>
                            <div>
							     <span class="span_number">
								     92%
							     </span>
                                <br>
                                <span class="span-normal">
								     乘车率
							     </span>
                            </div>
                        </td>
                    </tr>
                </table>
            </el-col>
            <el-col :span="8">
                <table style="width: 350px;height: 420px;">
                    <tr style="text-align: left">
                        <td colspan="3">
					     <span class="span-normal">
					        晚班统计
				         </span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <div>
                                <el-progress type="circle" :percentage="60"></el-progress>
                            </div>
                            <span class="span-normal">
						        晚班乘坐统计
					         </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
							     <span class="span_number">
								     1021
							     </span>
                                <br>
                                <span class="span-normal">
								     应乘人数
							     </span>
                            </div>
                        </td>
                        <td>
                            <div>
							     <span class="span_number">
								     100
							     </span>
                                <br>
                                <span class="span-normal">
								     缺乘人数
							     </span>
                            </div>
                        </td>
                        <td>
                            <div>
							     <span class="span_number">
								     92%
							     </span>
                                <br>
                                <span class="span-normal">
								     乘车率
							     </span>
                            </div>
                        </td>
                    </tr>
                </table>
            </el-col>
        </el-row>
        <el-row>
            <table style="margin-top: 10px;width: 100%;height: 100%;">
                <tr style="height: 90px;">
                    <td style="width: 220px;">
                        <span style="font-size: 18px; color: #bfcbd9">缺乘名单</span>
                    </td>
                    <td>

                    </td>
                </tr>
                <tr>
                    <td style="width: 220px;">
                        <el-tree
                                :data="treeData"
                                :props="defaultProps"
                                default-expand-all
                                @node-click="handleNodeClick"
                                highlight-current
                        >
                        </el-tree>
                    </td>
                    <td style="vertical-align: text-top;padding: 10px;">
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
                                    prop="nameplate"
                                    sortable
                                    label="学号">
                                <template scope="scope">
                                    <div>
                                        {{scope.row.id}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="photo"
                                    label="头像">
                                <template scope="scope">
                                    <div>
                                        {{scope.row.photo}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="姓名"
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
                                    prop="class"
                                    sortable
                                    label="班级">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="bus"
                                    sortable
                                    label="校车">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    sortable
                                    label="站点">
                                <template scope="scope">
                                    <div>
                                        {{scope.row.name}}
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </td>
                </tr>
            </table>

        </el-row>

    </div>
</template>

<script>
    var _this;
    export default {
        name: "DataBus",
        components: {},
        data() {
            _this = this;
            return {
                selectData: '',
                loadingUI: false,
                tableData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                treeData: [
                    {
                        id: 1,
                        label: '001校车',
                        children: [
                            {
                                id: "11",
                                label: '早班',
                            },
                            {
                                id: "12",
                                label: '午班',
                            },
                            {
                                id: "13",
                                label: '晚班',
                            }
                        ]
                    },
                    {
                        id: 2,
                        label: '002校车',
                        children: [
                            {
                                id: "21",
                                label: '早班',
                            },
                            {
                                id: "22",
                                label: '午班',
                            },
                            {
                                id: "23",
                                label: '晚班',
                            }]
                    },
                    {
                        id: 3,
                        label: '003校车',
                        children: [
                            {
                                id: "31",
                                label: '早班',
                            },
                            {
                                id: "32",
                                label: '午班',
                            },
                            {
                                id: "33",
                                label: '晚班',
                            }]
                    }
                ],
            }
        },
        watch: {},
        methods: {
            handleNodeClick(data) {
                console.log(data);
            }
        },
        computed: {},

        filters: {},

        created: function () {
            _this.selectData = new Date();

        },
        mounted: function () {
        }
    }
</script>
<style>
    /*tr {*/
    /*border: #bfcbd9 1px solid;*/
    /*text-align: center*/
    /*}*/
    td {
        border: #bfcbd9 1px solid;
        text-align: center
    }

    .span-normal {
        color: #666666;
        font-size: 14px;
    }

    .span_number {
        color: #666666;
        font-size: 16px;
    }
</style>
