define([], function(){

    var Validator ={};
    Validator.isEmpty=function(textStr){
        if(!textStr){
            return true;
        }
        if(textStr.length==0){
            return true;
        }
        if(textStr.trim().length == 0){
            return true;
        }
    };

    /**
     * @author
     * @description 判断数据是否为英文, 即全为字母
     * @param {String} str_data 待校验的数据
     * @returns {Boolean}, true:全为字母
     **/
    Validator.isEnglish = function (str_data) {
        var reg =  /^[a-zA-Z]+$/;
        return reg.test(str_data);
    };


    /**
     * @author
     * @description 判断数据是否为正整数
     * @param {String} str_data 待校验的数据
     * @returns {Boolean}, true:是正整数
     **/
    Validator.isInt = function (str_data) {
        var reg =  /^[0-9]+$/;
        return reg.test(str_data);
    };

    /**
     * @author
     * @description 判断数据是否为IPV4地址
     * @param {String} str_ip 待校验的数据
     * @returns {Boolean}, true:是IPV4地址
     **/
    Validator.isIpV4 = function (str_ip) {
        var reg =  /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;
        return reg.test(str_ip);
    };

    /**
     * @author
     * @description 判断数据是否为QQ号码
     * @param {String} str_qq 待校验的数据
     * @returns {Boolean}, true:是QQ号码
     **/
    Validator.isQQ = function (str_qq) {
        if (str_qq.match(/^\d{5,11}$/) == null) {
            return false;
        } else {
            return true;
        }
    };

    /**
     * @author
     * @description   判断数据是否为网址(URL)
     * @param {String} str_url 待校验的数据
     * @returns {Boolean}, true:是网址
     **/
    Validator.isUrl = function (str_url) {
        var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i
        if (regular.test(str_url)) {
            return true;
        } else {
            return false;
        }
    };


    /**
     * @author
     * @description 判断数据是否为邮箱
     * @param {String} str_email 待校验的数据
     * @returns {Boolean}, true:是邮箱
     **/
    Validator.isEmail = function (str_email) {
        return /^([a-zA-Z0-9_-]{1,16})@([a-zA-Z0-9]{1,6})(\.(?:com|net|org|edu|gov|mil|cn|us)){1,4}$/.test(str_email);
    };


    /**
     * @author
     * @description 判断数据是否包含特殊字符, 包含中文标点
     * @param {String} str_data 待校验的数据
     * @returns {Boolean}, true:包含特殊字符, null表示传入参数为null 或者传入参数为空串
     **/
    Validator.isContainsSpecialChar = function (str_data) {
        if (str_data) {
            //英文符号
            var containSpecialForEnglish = RegExp(/[(\s)(\`)(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);
            //中文符号
            var containSpecialForChinese = RegExp(/[(\·)(\~)(\！)(\￥)(\%)(\……)(\&)(\*)(\（)(\）)(\——)(\【)(\】)(\；)(\：)(\”)(\“)(\’)(\，)(\《)(\。)(\》)(\？)(\、)(\‘)(\’)]+/);
            return (containSpecialForEnglish.test(str_data) || containSpecialForChinese.test(str_data));
        }
        return null;
    };


    /**
     * @author
     * @description 判断数据是否为手机号
     * @param {String} str_mobile 待校验的数据
     * @returns {Boolean}, true:是手机号
     **/
    Validator.isMobile = function (str_mobile) {
        var length = str_mobile.length;
        return length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(str_mobile);
    };


    /**
     * @author
     * @description 判断数据是否为座机号(固定电话)
     * @param {String} str_telePhone 待校验的数据
     * @returns {Boolean}, true:是座机号
     **/
    Validator.isTelephone = function (str_telePhone) {
        if (str_telePhone.match(/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/) == null) {
            return false;
        } else {
            return true;
        }
    };


    /**
     * @author
     * @description 判断数据是否全为中文
     * @param {String} str_data 待校验的数据
     * @returns {Boolean}, true:全中文
     **/
    Validator.isChinese = function (str_data) {
        return /^[\u4E00-\u9FA5]*$/.test(str_data);
    }


    /**
     * @author
     * @description 表单/元素只能执行一次唯一性动作，不能重复执行(注意: 可以为表单ID, 也可以为元素ID), 您可以访问元素的"m_clickIndex"属性获取当前元素执行次数
     * @param {String} elementId  元素ID
     * @param {Long} [timeCycle]  可选，时间周期(秒), 在周期内则返回false
     * @returns {Boolean}, true:第一次执行, false:元素不存在或重复执行动作
     * @example 如果想让ID为"test"的按钮在10秒内只能提交一次表单, 则使用 Validator.isUniqueAction("test", 10);
     **/
    Validator.isUniqueAction = function (elementId, timeCycle) {
        var tmp = $("#" + elementId);
        var nowTimestamp = new Date().getTime();
        if (tmp.length) {
            if (timeCycle) {
                if (tmp.attr("m_lastClickTimestamp")) {
                    if ((timeCycle * 1000) <= (nowTimestamp - parseInt(tmp.attr("m_lastClickTimestamp")))) {
                        tmp.removeAttr("m_clickIndex");
                    } else {
                        tmp.attr("m_clickIndex", parseInt(tmp.attr("m_clickIndex")) + 1);
                        return false;
                    }
                }
            }

            tmp.attr("m_lastClickTimestamp", new Date().getTime());
            if (tmp.attr("m_clickIndex")) {
                tmp.attr("m_clickIndex", parseInt(tmp.attr("m_clickIndex")) + 1);
                return false;
            } else {
                tmp.attr("m_clickIndex", 1);
                return true;
            }
        } else {
            return false;
        }
    };

    /**
     * @author
     * @description 判断数据是否包含中文
     * @param {String} str_data 待校验的数据
     * @returns {Boolean}, true:包含中文
     **/
    Validator.isContainsChinese = function (str_data) {
        return /[\u4E00-\u9FA5]/.test(str_data);
    };

    /**
     * @author
     * @description 判断字符串是否以中文开头
     * @param {String} str_data 待校验的数据
     * @returns {Boolean}, true:以中文开头
     **/
    Validator.isChineseStart = function (str_data) {
        return /^[\u4E00-\u9FA5]+/.test(str_data);
    };



    /**
     * @author
     * @description 判断是否为银行卡号
     * @param {String} str_cardNo 待校验的数据
     * @returns {Boolean}, true:是银行卡号
     **/
    Validator.isBankCard = function (str_cardNo) {
        if ("" == str_cardNo.trim() || undefined == str_cardNo) {
            return false;
        }
        var lastNum = str_cardNo.substr(str_cardNo.length - 1, 1);//取出最后一位（与luhm进行比较）

        var first15Num = str_cardNo.substr(0, str_cardNo.length - 1);//前15或18位
        var newArr=new Array();
        for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
            newArr.push(first15Num.substr(i,1));
        }
        var arrJiShu=new Array();  //奇数位*2的积 <9
        var arrJiShu2=new Array(); //奇数位*2的积 >9

        var arrOuShu=new Array();  //偶数位数组
        for(var j=0;j<newArr.length;j++){
            if((j+1)%2==1){//奇数位
                if(parseInt(newArr[j])*2<9)
                    arrJiShu.push(parseInt(newArr[j])*2);
                else
                    arrJiShu2.push(parseInt(newArr[j])*2);
            }
            else //偶数位
                arrOuShu.push(newArr[j]);
        }

        var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
        var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
        for(var h=0;h<arrJiShu2.length;h++){
            jishu_child1.push(parseInt(arrJiShu2[h])%10);
            jishu_child2.push(parseInt(arrJiShu2[h])/10);
        }

        var sumJiShu=0; //奇数位*2 < 9 的数组之和
        var sumOuShu=0; //偶数位数组之和
        var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
        var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
        var sumTotal=0;
        for(var m=0;m<arrJiShu.length;m++){
            sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
        }

        for(var n=0;n<arrOuShu.length;n++){
            sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
        }

        for(var p=0;p<jishu_child1.length;p++){
            sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
            sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
        }
        //计算总和
        sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);

        //计算Luhm值
        var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;
        var luhm= 10-k;

        if(lastNum==luhm){
            return true;
        }
        else{
            return false;
        }
    };


    /**
     * @author
     * @description 判断是否为身份证号码
     * @param {String} str_idCard 待校验的数据
     * @returns {Boolean}, true:是身份证
     **/
    Validator.isIDCard = function (str_idCard) {
        var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
        var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
        var varArray = new Array();
        var lngProduct = 0;
        var intCheckDigit;
        var intStrLen = str_idCard.length;
        var idNumber = str_idCard;
        // initialize
        if ((intStrLen != 15) && (intStrLen != 18)) {
            return false;
        }
        // check and set value
        for (i = 0; i < intStrLen; i++) {
            varArray[i] = idNumber.charAt(i);
            if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
                return false;
            } else if (i < 17) {
                varArray[i] = varArray[i] * factorArr[i];
            }
        }

        if (intStrLen == 18) {
            //check date
            var date8 = idNumber.substring(6, 14);

            if (!/^[0-9]{8}$/.test(date8)) {
                return false;
            }
            var year, month, day;
            year = date8.substring(0, 4);
            month = date8.substring(4, 6);
            day = date8.substring(6, 8);
            var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            if (year < 1700 || year > 2500) return false;
            if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1] = 29;
            if (month < 1 || month > 12) return false;
            if (day < 1 || day > iaMonthDays[month - 1]) return false;

            // calculate the sum of the products
            for (i = 0; i < 17; i++) {
                lngProduct = lngProduct + varArray[i];
            }
            // calculate the check digit
            intCheckDigit = parityBit[lngProduct % 11];
            // check last digit
            if (varArray[17] != intCheckDigit) {
                return false;
            }
        }
        //length is 15
        else {
            //check date
            var date6 = idNumber.substring(6, 12);

            if (!/^[0-9]{6}$/.test(date6)) {
                return false;
            }
            var year, month, day;
            year = date6.substring(0, 4);
            month = date6.substring(4, 6);
            if (year < 1700 || year > 2500) return false;
            if (month < 1 || month > 12) return false;
        }
        return true;
    };

    return Validator;
});