﻿import SuperMap from '../SuperMap';
import {DataReturnMode} from  '../REST';
/**
 * @class SuperMap.DataReturnOption
 * @classdesc 数据返回设置类
 */
export default  class DataReturnOption {

    /**
     * @member SuperMap.DataReturnOption.prototype.expectCount -{Number}
     * @description 设置返回的最大记录数，小于或者等于0时表示返回所有记录数。
     */
    expectCount = 1000;

    /**
     * @member SuperMap.DataReturnOption.prototype.dataset -{String}
     * @description 设置结果数据集标识，当dataReturnMode为 SuperMap.DataReturnMode.DATASET_ONLY
     * 或SuperMap.DataReturnMode.DATASET_AND_RECORDSET时有效，
     * 作为返回数据集的名称。该名称用形如"数据集名称@数据源别名"形式来表示。
     */
    dataset = null;

    /**
     * @member SuperMap.DataReturnOption.prototype.dataReturnMode -{SuperMap.DataReturnMode}
     * @description 数据返回模式，默认为SuperMap.DataReturnMode.RECORDSET_ONLY。
     */
    dataReturnMode = DataReturnMode.RECORDSET_ONLY;

    /**
     * @member SuperMap.DataReturnOption.prototype.deleteExistResultDataset -{Boolean}
     * @description 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。
     */
    deleteExistResultDataset = true;

    constructor(options) {
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    }

    /**
     * @function SuperMap.DataReturnOption.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.expectCount = null;
        me.dataset = null;
        me.dataReturnMode = null;
        me.deleteExistResultDataset = null;
    }

    CLASS_NAME = "SuperMap.DataReturnOption"
}

SuperMap.DataReturnOption = DataReturnOption;