package com.AlphaZ.controller;

/**
 * ProjectName: jinzui
 * PackageName: com.AlphaZ.controller
 * User: C0dEr
 * Date: 2017/6/16
 * Time: 上午11:04
 * Description:This is a class of com.AlphaZ.controller
 */
public class contact {
    public String phone;
    public String qq;
    public String note;

    public contact(String phone, String qq, String note) {
        this.phone = phone;
        this.qq = qq;
        this.note = note;
    }

    public contact() {
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }



    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @Override
    public String toString() {
        return "手机号:" + (phone != null ? phone : "") +
                ", qq:" + (qq != null ? qq : "") + '\'' +
                ", 留言:" + (note != null ? note : "")
                ;
    }
}
