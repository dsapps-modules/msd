module.exports=[878726,a=>{"use strict";var b=a.i(187924),c=a.i(442815);a.i(515027);var d=a.i(39748);a.i(338248);var e=a.i(779829),f=a.i(17456),g=a.i(949822),h=a.i(543845),i=a.i(409830),j=a.i(924799),k=a.i(253295);a.i(672559);var l=a.i(786304),m=a.i(319974),n=a.i(842359),o=a.i(352237),p=a.i(930531),q=a.i(559365),r=a.i(58046),s=a.i(393787),t=a.i(256711),u=a.i(550408),v=a.i(532783),w=a.i(363447),x=a.i(32886),y=a.i(415925),z=a.i(50944),A=a.i(572131),B=a.i(214174);let C=({searchValue:a,selectPaymentStatus:c,startDate:C,endDate:D})=>{let E=(0,y.useTranslations)(),F=(0,r.useAppSelector)(a=>a.store.selectedStore),G=F?.id,H=(0,x.useLocale)(),[I,J]=(0,A.useState)(()=>parseInt(localStorage.getItem("itemsPerPage")||"10")),[K,L]=(0,A.useState)(1),[M,N]=(0,A.useState)({columnKey:"",order:""}),O="ascend"==M.order?"asc":"desc",{Orders:P,refetch:Q,isPending:R,error:S}=(0,o.useOrdersQuery)({...a,per_page:I,language:H,page:K,sortField:""==M.columnKey?"id":M.columnKey,sort:O,payment_status:c,store_id:G,start_date:C,end_date:D}),T=P?.meta?.total,U=P?.meta?.from,V=P?.meta?.last_page,W=(0,A.useMemo)(()=>{let a=P?.orders||[];return a?.map((a,b)=>({...a,serial:U+b,id:a?.order_id}))},[P,U]);(0,A.useEffect)(()=>{Number(K)>Number(V)?L(V):L(K)},[V,K]);let{PosSettings:X}=(0,p.usePosSettingsQuery)({}),Y=(0,A.useMemo)(()=>X||[],[X]),Z=Y?.data,{currency:$,refetch:_}=(0,q.useCurrencyQuery)({}),aa=(0,A.useMemo)(()=>$||{},[$]).currencies_info;return(0,A.useEffect)(()=>{R||S||Q()},[a,O,I,c,C,D,K,R,Q,S]),(0,b.jsx)(b.Fragment,{children:R?(0,b.jsx)(k.default,{}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(j.default,{originData:W,useColumn:(a,c)=>{let d=(()=>{let[a,b]=(0,A.useState)(!1);return(0,A.useEffect)(()=>{let a=()=>{b(window.innerWidth<768)};return a(),window.addEventListener("resize",a),()=>window.removeEventListener("resize",a)},[]),a})(),i=A.default.useMemo(()=>[{title:E("table_header.sl"),dataIndex:"serial",fixed:a?"left":void 0,width:"6%"},{title:E("table_header.order_id"),width:100,dataIndex:"order_id",render:a=>(0,b.jsx)("p",{className:"px-2",children:a?.order_id})},{title:E("table_header.invoice_no"),dataIndex:"invoice_number",width:150},{title:E("table_header.order_date"),dataIndex:"order_date",width:200},{title:E("table_header.customer"),width:200,dataIndex:"customer",render:a=>(0,b.jsx)("div",{className:"flex items-center gap-2",children:(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"text-blue-500 text-md font-semibold capitalize",children:a?.order_master?.customer?.full_name}),(0,b.jsx)("p",{className:"text-gray-500 dark:text-white text-sm font-normal mt-1",children:a?.order_master?.customer?.email})]})})},{title:E("table_header.order_amount"),dataIndex:"order_amount",width:150},{title:E("table_header.store"),dataIndex:"store",width:150},{title:E("table_header.payment_status"),dataIndex:"payment_status",width:150},{title:E("table_header.status"),dataIndex:"status",width:200},{title:E("table_header.actions"),dataIndex:"actions",width:"15%",fixed:!d&&c?"right":void 0}],[a,c,d]),j=(0,r.useAppDispatch)(),k=(0,z.useRouter)(),[m,o]=(0,A.useState)(null),q=(0,B.useSelector)(a=>a.cart.cart),{mutate:u}=(0,p.usePosInvoiceMutation)();return i.map(a=>"order_date"===a.dataIndex?{...a,render:(a,c)=>(0,b.jsx)("span",{children:a&&(0,t.format)(a,"dd MMMM yyyy hh:mm a")})}:"order_amount"===a.dataIndex?{...a,render:(a,c)=>(0,b.jsx)("span",{className:"text-right",children:aa?(0,h.formatPrice)(a,aa):a})}:"confirmed_by"===a.dataIndex?{...a,render:(a,c)=>(0,b.jsx)("span",{className:"text-blue-500",children:a&&(0,b.jsx)(w.UserRoundCheck,{})})}:"payment_status"===a.dataIndex?{...a,render:(a,c)=>{let d={paid:"border border-green-500 bg-green-50 text-green-600",partially_paid:"border border-blue-500 bg-blue-50 text-blue-600",refunded:"border border-purple-500 bg-purple-50 text-purple-600",failed:"border border-red-500 bg-red-50 text-red-600",pending:"border border-yellow-500 bg-yellow-50 text-yellow-600",default:"border border-gray-400 bg-gray-50 text-gray-600"},e=d[a]||d.default;return(0,b.jsx)("div",{className:"flex items-center justify-start gap-2",children:(0,b.jsx)("div",{className:"w-32",children:(0,b.jsx)("span",{className:`${e} capitalize py-1 px-2 rounded`,children:a?.replace(/_/g," ")})})})}}:"status"===a.dataIndex?{...a,render:(a,c)=>(0,b.jsx)("div",{className:"flex items-center justify-start gap-2",children:(0,b.jsx)("div",{className:"w-24",children:(0,b.jsx)(l.Badge,{className:` ${"delivered"===a?"bg-green-50 border border-green-500 text-green-500":"confirmed"===a?"bg-blue-50 border border-blue-500 text-blue-500":"shipped"===a?"bg-indigo-50 border border-indigo-500 text-indigo-500":"pending"===a?"bg-gray-50 border border-gray-500 text-gray-500":"processing"===a?"bg-yellow-50 border border-yellow-500 text-yellow-500":"bg-red-50 border border-red-500 text-red-500"} capitalize`,children:a})})})}:"actions"===a.dataIndex?{...a,render:(a,c)=>(0,b.jsxs)("div",{className:"flex items-center gap-2 ",children:[(0,b.jsx)(f.CustomViewIcon,{isLoading:m===c.order_id,onClick:a=>{var b;let d;return b=c.order_id,d=`${n.Routes.posOrderDetails}/${b}`,void(a.ctrlKey||a.metaKey||1===a.button?window.open(d,"_blank"):(o(b),k.push(d),j((0,s.setRefetch)(!0))))}}),(0,b.jsx)(e.CustomInvoiceIcon,{onClick:()=>{u({store_id:G,order_id:c.order_id},{onSuccess:a=>{var b;let c,d,e,f,i=(b=a?.data,c=b?.invoice,d=b?.store_details,e=(b?.qr_code).replace(/\n/g,"").replace(/\r/g,""),f=Z?.com_pos_settings_print_invoice==="thermal",`
      <html>
        <head>
          <title>Invoice ${c.invoice_number}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              ${f?"max-width: 80mm;":"width: 210mm;"} 
              margin: 0 auto;
              ${f?"padding: 10px;":"padding: 20mm 15mm;"}
              font-size: ${f?"13px":"14px"};
              color: #000;
            }
              @page {
              size: ${f?"80mm auto":"A4"}; 
              margin: ${f?"5mm":"15mm"}; /* ✅ printing margins */
            }
            .center { text-align: center; }
            .bold { font-weight: bold; }
            .line { border-top: 1px dashed #000; margin: 8px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 5px; }
            th, td { padding: 4px; text-align: left; font-size: ${f?"12px":"14px"}; }
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
              style="width: ${f?"50px":"80px"}; height: ${f?"50px":"80px"}; border-radius: 50%; object-fit: cover; margin: 0 auto 5px auto;"
            />
            <h2 style="margin: 0; font-size: ${f?"16px":"22px"};">${d?.name||"STORE NAME"}</h2>
            <p style="margin: 0; font-size: 12px;">${d?.address||""}</p>
            <p style="margin: 0; font-size: 12px;"><b>Contact:</b> ${d?.phone}, ${d?.email}</p>
            <h3 style="margin: 5px 0; font-size: ${f?"14px":"18px"};">INVOICE PAID</h3>
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
                    <td class="right">${aa?(0,h.formatPrice)(a.price,aa):a.price}</td>
                    <td class="right">${aa?(0,h.formatPrice)(a.amount,aa):a.amount}</td>
                  </tr>
                `).join("")}
            </tbody>
          </table>
    
          <div class="line"></div>
    
          <!-- Totals -->
          <div class="totals">
            <p style="display: flex; justify-content: space-between;"><b>Sub Total:</b> <span> ${aa?(0,h.formatPrice)(c.subtotal,aa):c.subtotal} </span> </p>
            <p style="display: flex; justify-content: space-between;"><b>Tax ${q[0]?.store_tax?`(${(0,g.formatNumberOnly)(Number(q[0].store_tax),aa)}%)`:""}:</b> <span> ${aa?(0,h.formatPrice)(c.total_tax_amount,aa):c.total_tax_amount} </span></p>
            <p style="display: flex; justify-content: space-between;"><b>Coupon Discount:</b> <span> ${aa?(0,h.formatPrice)(c.coupon_discount,aa):c.coupon_discount} </span></p>
            <div class="line"></div>
            <p style="display: flex; justify-content: space-between;"><b>Total:</b> <span> ${aa?(0,h.formatPrice)(c.total_amount,aa):c.total_amount} </span></p>
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
      </html>`),j=window.open("","_blank");if(j){j.document.write(i),j.document.close(),j.focus();let a=j.document.querySelector("img");a?a.onload=()=>{j.print(),j.close()}:(j.print(),j.close())}},onError:a=>{console.error("Invoice error:",a)}})}})]})}:a)},sortedInfo:M,handleSort:a=>{N(b=>{let c=b.columnKey===a&&"ascend"===b.order?"descend":"ascend";return{columnKey:a,order:c}})},maxWidth:1500}),(0,b.jsxs)("div",{className:"mt-4 flex flex-col md:flex-row gap-2 justify-between",children:[(0,b.jsx)("div",{children:(0,b.jsx)(d.AppSelect,{value:String(I),onSelect:a=>{J(parseInt(a)),L(1),localStorage.setItem("itemsPerPage",a)},groups:m.CountItems,customClass:"w-[80px] h-8 app-input",hideNone:!0})}),(0,b.jsx)(i.default,{pageSize:I,outline:!0,onChange:a=>{L(a)},current:K,total:T,defaultCurrent:1,jumpPrevIcon:(0,b.jsx)(u.ChevronsLeftIcon,{className:"h-4 w-4"}),jumpNextIcon:(0,b.jsx)(v.ChevronsRightIcon,{className:"h-4 w-4"})})]})]})})};var D=a.i(675161),E=a.i(699570),F=a.i(591119),G=a.i(866718),H=a.i(587532);let I=[{label:"Paid",value:"paid"},{label:"Pending",value:"pending"},{label:"Failed",value:"failed"}];a.s(["default",0,()=>{let a=(0,y.useTranslations)(),e=(0,z.usePathname)().split("/")[1],f="ar"===e?"rtl":"ltr",[g,h]=(0,A.useState)(""),[i,j]=(0,A.useState)(""),[k,l]=(0,A.useState)({search:""}),[m,n]=(0,A.useState)({from:null,to:null}),o=m.from?(0,t.format)(m.from,"yyyy-MM-dd"):null,p=m.to?(0,t.format)(m.to,"yyyy-MM-dd"):null,q=()=>{l({search:i})};return(0,A.useEffect)(()=>{""===i.trim()&&l({search:""})},[i]),(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(F.Card,{children:(0,b.jsxs)(F.CardContent,{dir:f,className:"grid grid-cols-1 lg:grid-cols-5 items-center gap-4 p-2 lg:p-4",children:[(0,b.jsx)("div",{className:"col-span-1 ",children:(0,b.jsxs)("h1",{className:"text-lg md:text-2xl font-semibold text-black dark:text-white flex items-center gap-2",children:[" ",(0,b.jsx)(c.default,{})," ",a("orders.orders")," "]})}),(0,b.jsxs)("div",{className:"flex flex-col lg:flex-row items-center gap-2 col-span-4 justify-end",children:[(0,b.jsxs)("div",{dir:f,className:"relative flex items-center gap-2 justify-end w-full",children:[(0,b.jsx)("div",{className:`${"ar"===e?"right-3":"left-3"} absolute  text-[#CCCFD7]`,children:(0,b.jsx)(H.Search,{width:18,height:18})}),(0,b.jsx)(G.Input,{type:"text",placeholder:a("place_holder.search_by_order_id_or_invoice_no"),value:i,onKeyDown:a=>{"Enter"===a.key&&q()},onChange:a=>{j(a.target.value)},className:"px-8 app-input"}),(0,b.jsx)(E.Button,{variant:"outline",onClick:q,className:"app-button",children:a("button.search")})]}),(0,b.jsx)("div",{className:"flex flex-col lg:flex-row items-center justify-end gap-2 w-full lg:w-48",children:(0,b.jsx)(d.AppSelect,{placeholder:a("place_holder.select_payment_status"),value:String(g),onSelect:a=>{let b=String(a);"none"===a?h(""):h(b)},groups:I,customClass:"mx-2 lg:mx-0 "})}),(0,b.jsx)("div",{className:"flex flex-col md:flex-row items-center justify-between gap-4 w-full md:w-auto",children:(0,b.jsx)("div",{className:"w-full",children:(0,b.jsx)(D.default,{dateRange:m,onDateChange:n,customSide:"right-0"})})})]})]})}),(0,b.jsx)(C,{searchValue:k,startDate:o,endDate:p,selectPaymentStatus:g})]})}],878726)}];

//# sourceMappingURL=src_components_screen_admin-section_pos_orders_index_tsx_0tx0nax._.js.map