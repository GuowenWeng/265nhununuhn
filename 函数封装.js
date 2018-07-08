/**
 * Created by dell on 2018/5/9.
 */
/**
 *
 * @param elements  Ԫ����
 * @param target    �����ﵽ��ֵ
 * @param attr      ��Ҫ�ı������
 * @param step      ����
 */


function animate_v2(elements,target,attr,step){
    clearInterval(elements.timer)
    step = step || 10;
    elements.timer = setInterval(function(){
        var curretrs = parseInt(window.getComputedStyle(elements)[attr]);
        var temp = (target-curretrs)/step;
        curretrs += target>curretrs? Math.ceil(temp):Math.floor(temp);
        elements.style[attr] = curretrs + "px";
        if(curretrs==target){
            clearInterval(elements.timer);
        }
    },20)
}

/**
 *
 * @param element    Ԫ����
 * @param type       �¼�ע������
 * @param Function      �¼�������
 */
//�����Ժ���
function fn(element, type, Function) {
    if (element.addEventListener != undefined) {
        element.addEventListener(type, Function, true);
    } else if (element.attachEvent != undefined) {
        element.attachEvent("on" + type, Function);
    } else {
       // arr.push(Function);
       // element["on" + type] = function(){
       //     for (var j = 0; j < arr.length; j++) {
       //         arr[j]();
       //     }
       // }
        element["on"+type] = Function;
    }
}

/**
 * [animate_v3 description]
 * @param  {[type]} elements [description] Ԫ����  
 * @param  {[type]} obj      [description] ����
 * @param  {[type]} Function [description] �ص�����
 * @param  {[type]} step     [description] ����
 * @return {[type]}          [description]
 */
function animate_v3(elements, obj, Function, step) {
    clearInterval(elements.timer)
    step = step || 10;
    //����ϵͳ��������
    if (window.getComputedStyle != undefined) {
        var style = window.getComputedStyle(elements);
    } else {
        var style = elements.currentStyle;
    }
    elements.timer = setInterval(function () {
        //�÷���������ȫ������������
        var falg = true;
        //�����������Ķ���,ÿһ��ѭ��,��ÿһ�����󶼼�һ��,ֱ��������ж���������Զ�����,ֹͣ��ʱ��.
        for (var attr in obj) {
            //�ж������õ������ǲ���ģ�����,��Ϊģ���̶�û�е�λ,������С��1��С��
            if (attr == "opacity") {
                //ģ���̶���С��1��С��,���������ȡԪ��֮��,Ҫת��Ϊ�������͵�ʱ��,Ҫ���ø���ת��
                var curretrs = parseFloat(style[attr]);
                //��Ϊ obj[������ǲ����,����Ҫ���������ʱ��,��Ҫ�Ȱ�����ֵ������Ԫ��,��������
                var target = obj[attr];
                curretrs *= 100;
                //������Ҫ����100,Ȼ��������ȡ��
                console.log(obj[attr]);
                target *= 100;
                //Ϊ�˼���С����Ӽ������,���ﻹҪ����ȡ��һ��
                target = Math.floor(target);
                curretrs = Math.floor(curretrs);
                var temp = (target - curretrs)/step;
                curretrs += temp>=0 ? Math.ceil(temp) : Math.floor(temp);
                elements.style[attr] = curretrs/100;
                if (curretrs != target) {
                    falg = false;
                }
            } else if (attr == "zIndex") {
                elements.style[attr] = obj[attr];
            } else {
                var curretrs = parseInt(style[attr]);
                var temp = (obj[attr] - curretrs) / step;
                curretrs += obj[attr] > curretrs ? Math.ceil(temp) : Math.floor(temp);
                elements.style[attr] = curretrs + "px";
                //�ж��Ƿ�����,���������Ļ�,�������false;
                if (curretrs != obj[attr]) {
                    falg = false;
                }
            }
        }
        if (falg) {
            clearInterval(elements.timer);
            //�ص����������þ����ܹ������¼���ִ�й�����,���Ը������ǵ���Ҫ����ִ�еĽ���,�������������ִ�й�������λ���ϵ�ʱ��,�Ǿ��Ǳ�ʾ��һ��������ִ����,�Ż᷵��Ҫִ�еĺ���;
            if (typeof Function == "function") {
                console.log(1);
                Function();

            }
        }
    }, 20)
}
