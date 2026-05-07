module.exports=[672986,a=>{"use strict";var b=a.i(187924),c=a.i(442815);a.i(515027);var d=a.i(39748),e=a.i(675161),f=a.i(543845),g=a.i(409830),h=a.i(924799);a.i(338248);var i=a.i(779829),j=a.i(17456);a.i(672559);var k=a.i(786304),l=a.i(319974),m=a.i(850295),n=a.i(559365),o=a.i(58046),p=a.i(393787),q=a.i(256711),r=a.i(550408),s=a.i(532783),t=a.i(363447),u=a.i(32886),v=a.i(415925),w=a.i(50944),x=a.i(572131),y=a.i(910801),z=a.i(949822),A=a.i(237914),B=a.i(214174),C=a.i(930531),D=a.i(253295);let E=({searchValue:a,selectPaymentStatus:c,startDate:e,endDate:E})=>{let F=(0,v.useTranslations)(),G=(0,o.useAppSelector)(a=>a.store.selectedStore),H=G?.id,I=(0,u.useLocale)(),[J,K]=(0,x.useState)(()=>parseInt(localStorage.getItem("itemsPerPage")||"10")),[L,M]=(0,x.useState)(1),[N,O]=(0,x.useState)({columnKey:"",order:""}),[P,Q]=(0,x.useState)(""),R="ascend"==N.order?"asc":"desc",{Orders:S,refetch:T,isPending:U,error:V}=(0,y.useOrdersQuery)({...a,per_page:J,language:I,page:L,sortField:""==N.columnKey?"id":N.columnKey,sort:R,status:P,payment_status:c,store_id:H,start_date:e,end_date:E}),W=S?.meta?.total,X=S?.meta?.from,Y=S?.meta?.last_page;S?.status;let Z=(0,x.useMemo)(()=>{let a=S?.orders||[];return a?.map((a,b)=>({...a,serial:X+b,id:a?.order_id}))},[S,X]);(0,x.useEffect)(()=>{Number(L)>Number(Y)?M(Y):M(L)},[Y,L]);let{PosSettings:$}=(0,C.usePosSettingsQuery)({}),_=(0,x.useMemo)(()=>$||[],[$]),aa=_?.data,{currency:ab,refetch:ac}=(0,n.useCurrencyQuery)({}),ad=(0,x.useMemo)(()=>ab||{},[ab]).currencies_info,[ae,af]=(0,x.useState)(!1),{mutate:ag}=(0,y.useCancelOrder)();return(0,x.useEffect)(()=>{U||V||T()},[a,R,J,P,c,e,E,L,U,T,V]),(0,b.jsx)(b.Fragment,{children:U?(0,b.jsx)(D.default,{}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(h.default,{originData:Z,useColumn:(a,c)=>{let d=(()=>{let[a,b]=(0,x.useState)(!1);return(0,x.useEffect)(()=>{let a=()=>{b(window.innerWidth<768)};return a(),window.addEventListener("resize",a),()=>window.removeEventListener("resize",a)},[]),a})(),e=x.default.useMemo(()=>[{title:F("table_header.sl"),dataIndex:"serial",fixed:a?"left":void 0,width:"6%"},{title:F("table_header.order_id"),width:100,dataIndex:"order_id",render:(a,c)=>(0,b.jsx)("p",{className:"px-2",children:c?.order_id})},{title:F("table_header.invoice_no"),dataIndex:"invoice_number",width:150},{title:F("table_header.order_date"),dataIndex:"order_date",width:200},{title:F("table_header.customer"),width:200,dataIndex:"customer",render:(a,c)=>(0,b.jsx)("div",{className:"flex items-center gap-2",children:(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"text-blue-500 text-md font-semibold capitalize",children:c?.order_master?.customer?.full_name}),(0,b.jsx)("p",{className:"text-gray-500 dark:text-white text-sm font-normal mt-1",children:c?.order_master?.customer?.email})]})})},{title:F("table_header.order_amount"),dataIndex:"order_amount",width:150},{title:F("table_header.store"),dataIndex:"store",width:150},{title:F("table_header.payment_status"),dataIndex:"payment_status",width:150},{title:F("table_header.status"),dataIndex:"status",width:200},{title:F("table_header.actions"),dataIndex:"actions",width:"15%",fixed:!d&&c?"right":void 0}],[a,c,d]),g=(0,o.useAppDispatch)(),h=(0,w.useRouter)(),[l,n]=(0,x.useState)(null),r=(0,B.useSelector)(a=>a.cart.cart),{mutate:s}=(0,A.usePosInvoiceMutation)();return e.map(a=>"order_date"===a.dataIndex?{...a,render:(a,c)=>(0,b.jsx)("span",{children:a&&(0,q.format)(a,"dd MMMM yyyy hh:mm a")})}:"order_amount"===a.dataIndex?{...a,render:(a,c)=>(0,b.jsx)("span",{className:"text-right",children:ad?(0,f.formatPrice)(a,ad):a})}:"confirmed_by"===a.dataIndex?{...a,render:(a,c)=>(0,b.jsx)("span",{className:"text-blue-500",children:a&&(0,b.jsx)(t.UserRoundCheck,{})})}:"payment_status"===a.dataIndex?{...a,render:(a,c)=>{let d={paid:"border border-green-500 bg-green-50 text-green-600",partially_paid:"border border-blue-500 bg-blue-50 text-blue-600",refunded:"border border-purple-500 bg-purple-50 text-purple-600",failed:"border border-red-500 bg-red-50 text-red-600",pending:"border border-yellow-500 bg-yellow-50 text-yellow-600",default:"border border-gray-400 bg-gray-50 text-gray-600"},e=d[a]||d.default;return(0,b.jsx)("div",{className:"flex items-center justify-start gap-2",children:(0,b.jsx)("div",{className:"w-32",children:(0,b.jsx)("span",{className:`${e} capitalize py-1 px-2 rounded`,children:a?.replace(/_/g," ")})})})}}:"status"===a.dataIndex?{...a,render:(a,c)=>(0,b.jsx)("div",{className:"flex items-center justify-start gap-2",children:(0,b.jsx)("div",{className:"w-24",children:(0,b.jsx)(k.Badge,{className:` ${"delivered"===a?"bg-green-50 border border-green-500 text-green-500":"confirmed"===a?"bg-blue-50 border border-blue-500 text-blue-500":"shipped"===a?"bg-indigo-50 border border-indigo-500 text-indigo-500":"pending"===a?"bg-gray-50 border border-gray-500 text-gray-500":"processing"===a?"bg-yellow-50 border border-yellow-500 text-yellow-500":"bg-red-50 border border-red-500 text-red-500"} capitalize`,children:a})})})}:"actions"===a.dataIndex?{...a,render:(a,c)=>(0,b.jsxs)("div",{className:"flex items-center gap-2 ",children:[(0,b.jsx)(j.CustomViewIcon,{isLoading:l===c.order_id,onClick:a=>{var b;let d;return b=c.order_id,d=`${m.SellerRoutes.posOrderDetails}/${b}`,void(a.ctrlKey||a.metaKey||1===a.button?window.open(d,"_blank"):(n(b),h.push(d),g((0,p.setRefetch)(!0))))}}),(0,b.jsx)(i.CustomInvoiceIcon,{onClick:()=>{s({store_id:H,order_id:c.order_id},{onSuccess:a=>{var b;let c,d,e,g,h=(b=a?.data,c=b?.invoice,d=b?.store_details,e=(b?.qr_code).replace(/\n/g,"").replace(/\r/g,""),g=aa?.com_pos_settings_print_invoice==="thermal",`
        <html>
          <head>
            <title>Invoice ${c.invoice_number}</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                ${g?"max-width: 80mm;":"width: 210mm;"} 
                margin: 0 auto;
                ${g?"padding: 10px;":"padding: 20mm 15mm;"}
                font-size: ${g?"13px":"14px"};
                color: #000;
              }
                @page {
                size: ${g?"80mm auto":"A4"}; 
                margin: ${g?"5mm":"15mm"}; /* ✅ printing margins */
              }
              .center { text-align: center; }
              .bold { font-weight: bold; }
              .line { border-top: 1px dashed #000; margin: 8px 0; }
              table { width: 100%; border-collapse: collapse; margin-top: 5px; }
              th, td { padding: 4px; text-align: left; font-size: ${g?"12px":"14px"}; }
              td { vertical-align: top; }
              .right { text-align: right; }
              .totals { margin-top: 10px; }
              .qr-code { margin-top: 10px; text-align: center; }
              .qr-code img { width: 80px; height: 80px; }
            </style>
          </head>
          <body>
            <!-- Header -->
            <div class="center">
              <img
                src="${d?.logo}"
                alt="Store Logo"
                style="width: ${g?"50px":"80px"}; height: ${g?"50px":"80px"}; border-radius: 50%; object-fit: cover; margin: 0 auto 5px auto;"
              />
              <h2 style="margin: 0; font-size: ${g?"16px":"22px"};">${d?.name||"STORE NAME"}</h2>
              <p style="margin: 0; font-size: 12px;">${d?.address||""}</p>
              <p style="margin: 0; font-size: 12px;"><b>Contact:</b> ${d?.phone}, ${d?.email}</p>
              <h3 style="margin: 5px 0; font-size: ${g?"14px":"18px"};">INVOICE PAID</h3>
            </div>
      
            <!-- Invoice Details -->
            <p><b>Invoice:</b> ${c.invoice_number}</p>
            <p><b>Customer:</b> ${c.customer?.name}</p>
            <p><b>Date:</b> ${c.invoice_date}</p>
            <div class="line"></div>
      
            <!-- Items Table -->
            <table>
              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th class="center">QTY</th>
                  <th class="right">PRICE</th>
                  <th class="right">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                ${c.items.map(a=>`
                    <tr>
                      <td>${a.name}<br/>
                        <small>${Object.entries(a.variant).map(([a,b])=>`${a}: ${b}`).join(", ")}</small>
                      </td>
                      <td class="center">${a.quantity}</td>
                      <td class="right">${ad?(0,f.formatPrice)(a.price,ad):a.price}</td>
                      <td class="right">${ad?(0,f.formatPrice)(a.amount,ad):a.amount}</td>
                    </tr>
                  `).join("")}
              </tbody>
            </table>
      
            <div class="line"></div>
      
            <!-- Totals -->
            <div class="totals">
              <p style="display: flex; justify-content: space-between;"><b>Sub Total:</b> <span> ${ad?(0,f.formatPrice)(c.subtotal,ad):c.subtotal} </span> </p>
              <p style="display: flex; justify-content: space-between;"><b>Tax ${r[0]?.store_tax?`(${(0,z.formatNumberOnly)(Number(r[0].store_tax),ad)}%)`:""}:</b> <span> ${ad?(0,f.formatPrice)(c.total_tax_amount,ad):c.total_tax_amount} </span></p>
              <p style="display: flex; justify-content: space-between;"><b>Coupon Discount:</b> <span> ${ad?(0,f.formatPrice)(c.coupon_discount,ad):c.coupon_discount} </span></p>
              <div class="line"></div>
              <p style="display: flex; justify-content: space-between;"><b>Total:</b> <span> ${ad?(0,f.formatPrice)(c.total_amount,ad):c.total_amount} </span></p>
            </div>
      
            <div class="line"></div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div class="center">
                <p>Thank you for shopping!</p>
                <small>Powered by POS System</small>
              </div>
              <div class="qr-code">
                <img src="${e}" alt="QR Code" />
              </div>
            </div>
          </body>
        </html>`),i=window.open("","_blank");if(i){i.document.write(h),i.document.close(),i.focus();let a=i.document.querySelector("img");a?a.onload=()=>{i.print(),i.close()}:(i.print(),i.close())}},onError:a=>{console.error("Invoice error:",a)}})}})]})}:a)},sortedInfo:N,handleSort:a=>{O(b=>{let c=b.columnKey===a&&"ascend"===b.order?"descend":"ascend";return{columnKey:a,order:c}})},maxWidth:1500}),(0,b.jsxs)("div",{className:"mt-4 flex flex-col md:flex-row gap-2 justify-between",children:[(0,b.jsx)("div",{children:(0,b.jsx)(d.AppSelect,{value:String(J),onSelect:a=>{K(parseInt(a)),M(1),localStorage.setItem("itemsPerPage",a)},groups:l.CountItems,customClass:"w-[80px] h-8 app-input",hideNone:!0})}),(0,b.jsx)(g.default,{pageSize:J,outline:!0,onChange:a=>{M(a)},current:L,total:W,defaultCurrent:1,jumpPrevIcon:(0,b.jsx)(r.ChevronsLeftIcon,{className:"h-4 w-4"}),jumpNextIcon:(0,b.jsx)(s.ChevronsRightIcon,{className:"h-4 w-4"})})]})]})})};var F=a.i(699570),G=a.i(591119),H=a.i(866718),I=a.i(587532);let J=[{label:"Paid",value:"paid"},{label:"Pending",value:"pending"},{label:"Failed",value:"failed"}];a.s(["default",0,()=>{let a=(0,v.useTranslations)(),f=(0,w.usePathname)().split("/")[1],g="ar"===f?"rtl":"ltr",[h,i]=(0,x.useState)(""),[j,k]=(0,x.useState)(""),[l,m]=(0,x.useState)({search:""}),[n,o]=(0,x.useState)({from:null,to:null}),p=n.from?(0,q.format)(n.from,"yyyy-MM-dd"):null,r=n.to?(0,q.format)(n.to,"yyyy-MM-dd"):null,s=()=>{m({search:j})};return(0,x.useEffect)(()=>{""===j.trim()&&m({search:""})},[j]),(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(G.Card,{children:(0,b.jsxs)(G.CardContent,{dir:g,className:"grid grid-cols-1 lg:grid-cols-5 items-center gap-4 p-2 lg:p-4",children:[(0,b.jsx)("div",{className:"col-span-1 ",children:(0,b.jsxs)("h1",{className:"text-lg md:text-2xl font-semibold text-black dark:text-white flex items-center gap-2",children:[" ",(0,b.jsx)(c.default,{})," ",a("orders.orders")," "]})}),(0,b.jsxs)("div",{className:"flex flex-col lg:flex-row items-center gap-2 col-span-4 justify-end",children:[(0,b.jsxs)("div",{dir:g,className:"relative flex items-center gap-2 justify-end w-full",children:[(0,b.jsx)("div",{className:`${"ar"===f?"right-3":"left-3"} absolute  text-[#CCCFD7]`,children:(0,b.jsx)(I.Search,{width:18,height:18})}),(0,b.jsx)(H.Input,{type:"text",placeholder:a("place_holder.search_by_order_id_or_invoice_no"),value:j,onKeyDown:a=>{"Enter"===a.key&&s()},onChange:a=>{k(a.target.value)},className:"px-8 app-input"}),(0,b.jsx)(F.Button,{variant:"outline",onClick:s,className:"app-button",children:a("button.search")})]}),(0,b.jsx)("div",{className:"flex flex-col lg:flex-row items-center justify-end gap-2 w-full lg:w-48",children:(0,b.jsx)(d.AppSelect,{placeholder:a("place_holder.select_payment_status"),value:String(h),onSelect:a=>{let b=String(a);"none"===a?i(""):i(b)},groups:J,customClass:"mx-2 lg:mx-0 "})}),(0,b.jsx)("div",{className:"flex flex-col md:flex-row items-center justify-between gap-4 w-full md:w-auto",children:(0,b.jsx)("div",{className:"w-full",children:(0,b.jsx)(e.default,{dateRange:n,onDateChange:o,customSide:"right-0"})})})]})]})}),(0,b.jsx)(E,{searchValue:l,startDate:p,endDate:r,selectPaymentStatus:h})]})}],672986)}];

//# sourceMappingURL=src_components_screen_seller-section_store_pos_orders_index_tsx_042audn._.js.map