import React, { Fragment, useEffect, useState } from 'react';
import { Input, message, Radio } from 'antd';
import FormItem from './formItem/formItem';
import {
  bankCodeFun,
  checkEnterPrisePhone,
  emailFun,
  invoiceCompanyCodeFun,
  phoneFun,
} from '../../../../../tools/tools';
import './merchantSpread.less';
import { connect } from 'react-redux';
import {
  changeIsSubmitOrder,
  changeSubmitOrderInvoice,
} from '../../../../../redux/actions';

function MerchantSpread(props) {
  const [brandId, setBrandId] = useState(); // 商家id
  const [invoiceType, setInvoiceType] = useState(0); // 选项发票类型 0 是不开发票，1是电子发票
  const [invoiceTitle, setInvoiceTitle] = useState(1); // 选项发票抬头 1 是个人发票， 2是企业发票
  const [personalInvoiceData, setPersonalInvoiceData] = useState({
    invoiceTitle: '个人',
    invoiceTel: '', // 必需
    invoiceEmail: '',
  }); // 个人抬头发票数据收集
  const [personalTitleTip, setPersonalTitleTip] = useState(''); // 抬头名称不符合条件式时所提示的内容
  const [personalPhoneTip, setPersonalPhoneTip] = useState(' '); // 个人抬头电话号码不符合条件式时所提示的内容
  const [personalEmailTip, setPersonalEmailTip] = useState(''); // 个人抬头邮箱不符合条件式时所提示的内容

  // 企业发票数据收集
  const [enterPriseInvoiceData, setEnterPriseInvoiceData] = useState({
    invoiceTitle: '', //企业名称
    invoiceCompanyCode: '', // 纳税人识别号
    invoiceBank: '', // 开户银行
    invoiceBankCode: '', // 银行卡号
    invoiceCompanyTel: '', // 企业电话
    invoiceCompanyAddress: '', // 企业地址
  });

  const [enterPriseTitleTip, setEnterPriseTitleTip] = useState(' '); // 企业发票中的title 不符合条件显示的文字
  const [enterPriseCompanyCodeTip, setEnterPriseCompanyCodeTip] = useState(' '); // 企业发票中的纳税人识别号 不符合条件显示的文字
  const [enterPriseBankTip, setEnterPriseBankTip] = useState(' '); // 企业发票中的开户银行 不符合条件显示的文字
  const [enterPriseBankCodeTip, setEnterPriseBankCodeTip] = useState(' '); // 企业发票中的银行号码 不符合条件显示的文字
  const [enterPriseTelTip, setEnterPriseTelTip] = useState(' '); // 企业发票中的电话号码 不符合条件显示的文字
  const [enterPriseTelAddressTip, SetEnterPriseTelAddressTip] = useState(' '); // 企业发票中的企业地址 不符合条件显示的文字

  useEffect(() => {
    if (props.isSubmitOrder) {
      // 为true的时候是提交订单的时候 收集数据
      if (invoiceTitle == 1 && invoiceType == 1) {
        // 开发票
        //个人发票的时候
        if (!personalTitleTip && !personalPhoneTip && !personalEmailTip) {
          // 判断是否正确的填写
          // 拷贝
          const newObj = { ...JSON.parse(JSON.stringify(personalInvoiceData)) };
          newObj.brand_id = props.brandId;
          newObj.invoiceType = invoiceType;
          // 推送
          props.changeSubmitOrderInvoice(newObj);
          props.changeIsSubmitOrder(3);
        } else {
          // 不通过 redux 提交的状态改变
          props.changeIsSubmitOrder(false);
          message.error('请补全个人发票中的内容');
        }
      } else if (invoiceTitle == 2 && invoiceType == 1) {
        // 企业发票
        if (
          !enterPriseTitleTip &&
          !enterPriseCompanyCodeTip &&
          !enterPriseBankCodeTip &&
          !enterPriseTelTip
        ) {
          // console.log('123')
          //收集数据
          const newObj = {
            ...JSON.parse(JSON.stringify(enterPriseInvoiceData)),
          };
          newObj.brand_id = props.brandId;
          newObj.invoiceType = invoiceType;

          // 推送
          props.changeSubmitOrderInvoice(newObj);

          props.changeIsSubmitOrder(3);
        } else {
          // 不通过 redux 提交的状态改变
          props.changeIsSubmitOrder(false);
          message.error('请补全企业发票中内容是否有误');
        }
      } else {
        //不开发票 不做处理
        props.changeIsSubmitOrder(3);
      }
    }
  }, [props.isSubmitOrder]);

  useEffect(() => {
    // 设置商家id
    setBrandId(props.brandId);
  }, [props.brandId]);

  // 修改发票类型
  const changeInvoiceType = (e) => {
    // console.log(e.target.value)
    setInvoiceType(e.target.value);
  };
  // 修改发票抬头
  const changeInvoiceTitle = (e) => {
    setInvoiceTitle(e.target.value);
  };

  // 个人发票数据收集
  const changePersonalTitle = (e) => {
    const value = e.target.value.trim();
    if (!value) {
      setPersonalTitleTip('抬头名称不能为空');
    } else {
      setPersonalTitleTip('');
    }
    let newValue = { ...JSON.parse(JSON.stringify(personalInvoiceData)) };
    newValue.invoiceTitle = value;
    setPersonalInvoiceData(newValue);
  };

  // 验证和变更个人抬头发票中的电话号码
  const changePersonalPhone = (e) => {
    const value = e.target.value.trim();
    let newValue = { ...JSON.parse(JSON.stringify(personalInvoiceData)) };
    newValue.invoiceTel = value;
    setPersonalInvoiceData(newValue);
    if (!value) {
      setPersonalPhoneTip('电话号码不能为空');
    } else if (!phoneFun(value)) {
      setPersonalPhoneTip('无效的电话号码');
    } else if (phoneFun(value)) {
      setPersonalPhoneTip('');
    } else if (value) {
      setPersonalPhoneTip('');
    }
  };

  // 验证和变更个人抬头发票中的邮箱
  const changePersonalEmail = (e) => {
    const value = e.target.value.trim();
    if (!value) {
      setPersonalEmailTip('');
    } else if (!emailFun(value)) {
      setPersonalEmailTip('邮箱格式有误');
    } else {
      setPersonalEmailTip('');
    }
    let newValue = { ...JSON.parse(JSON.stringify(personalInvoiceData)) };
    newValue.invoiceEmail = value;
    setPersonalInvoiceData(newValue);
  };

  /**
   * 以下是企业发票数据修改
   */

  // 修改title
  const changeEnterPriseTitle = (e) => {
    const value = e.target.value.trim();
    let newValue = { ...JSON.parse(JSON.stringify(enterPriseInvoiceData)) };
    newValue.invoiceTitle = value;
    setEnterPriseInvoiceData(newValue);
    if (!value) {
      setEnterPriseTitleTip('企业名称不能为空');
    } else {
      setEnterPriseTitleTip('');
    }
  };
  // 修改CompanyCode 纳税人识别号
  const changeEnterPriseCompanyCode = (e) => {
    const value = e.target.value;
    let newValue = { ...JSON.parse(JSON.stringify(enterPriseInvoiceData)) };
    newValue.invoiceCompanyCode = value;
    setEnterPriseInvoiceData(newValue);
    if (!value) {
      setEnterPriseCompanyCodeTip('纳税人识别号不能为空');
    } else if (!invoiceCompanyCodeFun(value)) {
      setEnterPriseCompanyCodeTip('纳税人识别号格式有误');
    } else {
      setEnterPriseCompanyCodeTip('');
    }
  };

  // 修改开户银行 bank
  const changeEnterPriseBank = (e) => {
    const value = e.target.value.trim();
    let newValue = { ...JSON.parse(JSON.stringify(enterPriseInvoiceData)) };
    newValue.invoiceBank = value;
    setEnterPriseInvoiceData(newValue);
  };

  // 修改银行卡号， bankCode

  const changeEnterPriseBankCode = (e) => {
    const value = e.target.value.trim();
    let newValue = { ...JSON.parse(JSON.stringify(enterPriseInvoiceData)) };
    newValue.invoiceBankCode = value;
    setEnterPriseInvoiceData(newValue);
    if (!e.target.value) {
      setEnterPriseBankCodeTip('');
    } else if (!bankCodeFun(e.target.value)) {
      // console.log('123')
      setEnterPriseBankCodeTip('请输入正确的银行卡卡号');
    } else {
      setEnterPriseBankCodeTip('');
    }
  };

  // 修改企业电话，changeEnterPriseTel
  const changeEnterPriseTel = (e) => {
    const value = e.target.value.trim();
    let newValue = { ...JSON.parse(JSON.stringify(enterPriseInvoiceData)) };
    newValue.invoiceCompanyTel = value;
    setEnterPriseInvoiceData(newValue);
    if (!value) {
      setEnterPriseTelTip('');
    } else if (!checkEnterPrisePhone(value)) {
      setEnterPriseTelTip('企业电话号码格式有误');
    } else {
      setEnterPriseTelTip('');
    }
  };

  // 修改企业地址， changeEnterPriseAddress
  const changeEnterPriseAddress = (e) => {
    const value = e.target.value.trim();
    let newValue = { ...JSON.parse(JSON.stringify(enterPriseInvoiceData)) };
    newValue.invoiceCompanyAddress = value;
    setEnterPriseInvoiceData(newValue);
  };

  return (
    <Fragment>
      {/*发票*/}
      <div className="form-invoice-item">
        {/*发票类型*/}
        <div className="form-item no-border">
          <span className="left-label">发票类型</span>
          {/*发票选择框*/}
          <div className="select">
            <Radio.Group
              defaultValue="0"
              onChange={changeInvoiceType}
              size="large"
              className="option-list"
            >
              <Radio.Button value="0" className="option">
                不开发票
              </Radio.Button>
              <Radio.Button value="1" className="option">
                电子发票
              </Radio.Button>
            </Radio.Group>
          </div>
        </div>

        {invoiceType == 1 ? (
          <div className="invoiceTitle">
            {/*发票抬头部分*/}
            <div className="form-item">
              <span className="left-label">发票抬头</span>
              <div className="select">
                <Radio.Group
                  defaultValue="1"
                  onChange={changeInvoiceTitle}
                  size="large"
                  className="option-list"
                >
                  <Radio.Button value="1" className="option">
                    个人
                  </Radio.Button>
                  <Radio.Button value="2" className="option">
                    企业
                  </Radio.Button>
                </Radio.Group>
                {/*个人发票填写部分*/}
                {invoiceTitle == 1 ? (
                  <ul className="invoice-add">
                    <li>
                      <div className="input-item">
                        <div className="ipt-wrapper">
                          <Input
                            placeholder="抬头名称"
                            maxLength="50"
                            min="0"
                            className="ipt"
                            title="personalInvoiceTitle"
                            defaultValue={personalInvoiceData.invoiceTitle}
                            value={personalInvoiceData.invoiceTitle}
                            onChange={changePersonalTitle}
                            size={'large'}
                          />

                          <span className="ipt-tip">{personalTitleTip}</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="input-item">
                        <div className="ipt-wrapper">
                          <Input
                            placeholder="手机号码"
                            maxLength="11"
                            min="11"
                            className="ipt"
                            title="invoiceTel"
                            defaultValue={personalInvoiceData.invoiceTel}
                            value={personalInvoiceData.invoiceTel}
                            onChange={changePersonalPhone}
                            size={'large'}
                          />

                          <span className="ipt-tip">{personalPhoneTip}</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="input-item">
                        <div className="ipt-wrapper">
                          <Input
                            placeholder="电子邮箱(选填)"
                            maxLength="50"
                            min="0"
                            className="ipt"
                            title="invoiceEmail"
                            defaultValue={personalInvoiceData.invoiceEmail}
                            value={personalInvoiceData.invoiceEmail}
                            onChange={changePersonalEmail}
                            size={'large'}
                          />

                          <span className="ipt-tip">{personalEmailTip}</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                ) : (
                  /*企业发票部分*/
                  <ul className="invoice-add">
                    <li>
                      <div className="input-item">
                        <div className="ipt-wrapper">
                          <Input
                            placeholder="企业名称"
                            maxLength="50"
                            min="0"
                            className="ipt"
                            title="invoiceTitle"
                            defaultValue={enterPriseInvoiceData.invoiceTitle}
                            value={enterPriseInvoiceData.invoiceTitle}
                            onChange={changeEnterPriseTitle}
                            size={'large'}
                          />
                          <span className="ipt-tip">{enterPriseTitleTip}</span>
                        </div>
                      </div>
                    </li>
                    {/*纳税人识别号*/}
                    <li>
                      <div className="input-item">
                        <div className="ipt-wrapper">
                          <Input
                            placeholder="纳税人识别号"
                            maxLength="20"
                            min="15"
                            className="ipt"
                            title="invoiceCompanyCode"
                            defaultValue={
                              enterPriseInvoiceData.invoiceCompanyCode
                            }
                            value={enterPriseInvoiceData.invoiceCompanyCode}
                            onChange={changeEnterPriseCompanyCode}
                            size={'large'}
                          />
                          <span className="ipt-tip">
                            {enterPriseCompanyCodeTip}
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      {/*开户银行*/}
                      <div className="input-item">
                        <div className="ipt-wrapper">
                          <Input
                            placeholder="开户银行(选填)"
                            maxLength="20"
                            min="0"
                            className="ipt"
                            title="invoiceBank"
                            defaultValue={enterPriseInvoiceData.invoiceBank}
                            value={enterPriseInvoiceData.invoiceBank}
                            onChange={changeEnterPriseBank}
                            size={'large'}
                          />
                          <span className="ipt-tip">{enterPriseBankTip}</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      {/*银行卡号*/}
                      <div className="input-item">
                        <div className="ipt-wrapper">
                          <Input
                            placeholder="银行卡号(选填)"
                            maxLength="19"
                            min="0"
                            className="ipt"
                            title="invoiceBankCode"
                            defaultValue={enterPriseInvoiceData.invoiceBankCode}
                            value={enterPriseInvoiceData.invoiceBankCode}
                            onChange={changeEnterPriseBankCode}
                            size={'large'}
                          />

                          <span className="ipt-tip">
                            {enterPriseBankCodeTip}
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      {/*企业电话*/}
                      <div className="input-item">
                        <div className="ipt-wrapper">
                          <Input
                            placeholder="企业电话(选填)"
                            maxLength="20"
                            min="0"
                            className="ipt"
                            title="invoiceCompanyTel"
                            defaultValue={
                              enterPriseInvoiceData.invoiceCompanyTel
                            }
                            value={enterPriseInvoiceData.invoiceCompanyTel}
                            onChange={changeEnterPriseTel}
                            size={'large'}
                          />
                          <span className="ipt-tip">{enterPriseTelTip}</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      {/*企业地址*/}
                      <div className="input-item">
                        <div className="ipt-wrapper">
                          <Input
                            placeholder="企业地址(选填)"
                            maxLength="20"
                            min="0"
                            className="ipt"
                            title="invoiceCompanyAddress"
                            defaultValue={
                              enterPriseInvoiceData.invoiceCompanyAddress
                            }
                            value={enterPriseInvoiceData.invoiceCompanyAddress}
                            onChange={changeEnterPriseAddress}
                            size={'large'}
                          />
                          <span className="ipt-tip">
                            {enterPriseTelAddressTip}
                          </span>
                        </div>
                      </div>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        ) : (
          ''
        )}

        {/*常见发票问题*/}
        <div className="form-invoice-pro">
          <a
            href="https://www.xiaomiyoupin.com/app/shop/content?id=o6448d039aa15c092"
            rel="noopener noreferrer"
            target="_blank"
          >
            常见发票问题&gt;&gt;
          </a>
        </div>
      </div>
      {/*售后免邮部分*/}
      <FormItem brandId={props.brandId} />
    </Fragment>
  );
}

export default connect(
  (state) => ({
    submitOrderData: state.submitOrderData,
    isSubmitOrder: state.isSubmitOrder,
  }),
  { changeSubmitOrderInvoice, changeIsSubmitOrder }
)(MerchantSpread);
