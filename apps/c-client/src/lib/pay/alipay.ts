// lib/pay/alipay.ts

import { AlipaySdk } from "alipay-sdk";

export const MyAlipaySdk = new AlipaySdk({
  appId: process.env.ALIPAY_APP_ID!,
  privateKey: process.env.ALIPAY_PRIVATE_KEY!,
  alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY!, // 可选（用于验签）
  // gateway: "https://openapi.alipay.com/gateway.do",
  gateway: "https://openapi-sandbox.dl.alipaydev.com/gateway.do",
  // charset: "utf-8",
  // signType: "RSA2",
});

export async function createAlipayOrder({
  outTradeNo,
  totalAmount,
  subject,
  returnUrl = "http://localhost:3000/pay/success",
  notifyUrl = "https://yourdomain.com/api/pay/notify",
}: {
  outTradeNo: string;
  totalAmount: number;
  subject: string;
  returnUrl: string;
  notifyUrl: string;
}) {
  const bizContent = {
    // out_trade_no: outTradeNo,
    // total_amount: totalAmount,
    // subject,
    // product_code: "QUICK_WAP_WAY",
    out_trade_no: outTradeNo,
    total_amount: totalAmount,
    subject,
    product_code: "QUICK_WAP_WAY",
  };
  // 支付页面接口，返回支付链接，交由用户打开，会跳转至支付宝网站
  const url = MyAlipaySdk.pageExecute("alipay.trade.wap.pay", "GET", {
    bizContent,
    returnUrl,
    notifyUrl,
  });
  // const result = await alipaySdk.pageExecute("alipay.trade.wap.pay", {
  //   notifyUrl,
  //   returnUrl,
  //   biz_content: {
  //     out_trade_no: outTradeNo,
  //     total_amount: totalAmount,
  //     subject: subject,
  //     product_code: "QUICK_WAP_WAY",
  //   },
  // });

  return url;
}

export async function queryAlipayOrder(orderId: string) {
  const result = await MyAlipaySdk.exec("alipay.trade.query", {
    // bizContent: {
    //   out_trade_no: orderId,
    //   trade_no: "2014112611001004680+073956707",
    //   query_options: ["trade_settle_info"],
    // },
    biz_content: {
      out_trade_no: orderId,
    },
  });
  return result;
}
