﻿/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: ThemeGridUnique
 * 栅格单值专题图类。
 * 栅格单值专题图，是将单元格值相同的归为一类，为每一类设定一种颜色，从而用来区分不同的类别。
 * 栅格单值专题图适用于离散栅格数据和部分连续栅格数据，对于单元格值各不相同的那些连续栅格数据，使用栅格单值专题图不具有任何意义。
 *
 * Inherits from:
 *  - <Theme>
 */
require('../base');
require('./ServerColor');
require('./Theme');
require('./ThemeGridUniqueItem');
ThemeGridUnique = SuperMap.Class(Theme, {

    /**
     * APIProperty: defaultcolor
     * {<ServerColor>} 栅格单值专题图的默认颜色。
     * 对于那些未在格网单值专题图子项之列的要素使用该颜色显示。
     */
    defaultcolor: null,

    /**
     * APIProperty: items
     * {Array(<ThemeGridUniqueItem>)} 栅格单值专题图子项数组。
     * 栅格单值专题图将值相同的单元格归为一类，每一类是一个专题图子项。
     */
    items: null,

    /**
     * Constructor: ThemeGridUnique
     * 栅格单值专题图类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * items - {Array(<ThemeGridUniqueItem>)} 栅格单值专题图子项数组。
     * defaultcolor - {<ServerColor>} 栅格单值专题图的默认颜色。
     */
    initialize: function (options) {
        var me = this;
        me.defaultcolor = new ServerColor();
        Theme.prototype.initialize.apply(this, ["GRIDUNIQUE", options]);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        Theme.prototype.destroy.apply(this, arguments);
        var me = this;
        if (me.items) {
            if (me.items.length > 0) {
                for (var item in me.items) {
                    me.items[item].destroy();
                    me.items[item] = null;
                }
            }
            me.items = null;
        }

        if (me.defaultcolor) {
            me.defaultcolor.destroy();
            me.defaultcolor = null;
        }
    },

    /**
     * Method: toServerJSONObject
     * 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject: function () {
        var obj = {};
        obj = SuperMap.Util.copyAttributes(obj, this);
        if (obj.defaultcolor) {
            if (obj.defaultcolor.toServerJSONObject) {
                obj.defaultcolor = obj.defaultcolor.toServerJSONObject();
            }
        }
        if (obj.items) {
            var items = [],
                len = obj.items.length;
            for (var i = 0; i < len; i++) {
                items.push(obj.items[i].toServerJSONObject());
            }
            obj.items = items;
        }
        return obj;
    },

    CLASS_NAME: "ThemeGridUnique"
});
ThemeGridUnique.fromObj = function (obj) {
    var res = new ThemeGridUnique();
    var uItems = obj.items;
    var len = uItems ? uItems.length : 0;
    SuperMap.Util.extend(res, obj);
    res.items = [];
    res.defaultcolor = new ServerColor.fromJson(obj.defaultcolor);
    for (var i = 0; i < len; i++) {
        res.items.push(new ThemeGridUniqueItem.fromObj(uItems[i]));
    }
    return res;
};
module.exports = function (options) {
    return new ThemeGridUnique(options);
};
