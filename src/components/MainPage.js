import React, { Component } from "react";
import "../css/Table.css";
import CallOut from "./CallOut";
import Files from "./Files";
import WayBillList from "./WayBillList";
import TopBar from "./TopBar";
import ProductOutModal from "./ProductOutModal";
import ProductEditModal from "./ProductEditModal";
import ProductNewModal from "./ProductNewModal";
import ArticelsTable from "./ArticelsTable";
import LayoutRight from "./LayoutRight";
import LayoutNote from "./LayoutNote";
import CreateArticelModal from "./CreateArticelModal";
import OrdersTable from "./OrdersTable";
import LeftNav from "./LeftNav";

const USER_SERVICE_URL = "StartApi.ashx?Platform=Android&ProcessType=";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Articels: [],
      Orders: [],
      Waybill: [],
      Corps: [],
      OneWayBill: [],
      Files: [],
      ProductTypes: [],
      SalesTypes: [],
      ArticelNotes: "",
      Piece: 0,
      WayBillId: 0,
      Dimensions: "",
      OrderId: 0,
      Weight: 0,
      CorpName: "",
      Color: "",
      TypeName: "",
      TypeId: 0,
      CorpId: 0,
      LoopCount: 0,
      TotalOutPiece: 0,
      TotalOutWeight: 0,
      ArticelId: 0,
      SaleTypeId: 0,
      ChangeView: false,
      IsFirstRun: true,
      isShow: true,
      FilesVisible: true,
      WayBillVisible: true,
      OrderVisible: true,
      MenuStatu: false,
      IsCreateArticelShow: false,
      IsNewProductShow: false,
      isShowFiles: false,
      isShowOrder: false,
      isShowTopBar: false,
      isShowLayoutNote: false,
      ismodalvisible: false,
      isShowProductOut: false,
      isShowProductEdit: false,
      isShowCallOut: false,
      CalloutLoading: false,
      isFetching: false,
      isShowLayoutRight: false,

      isShowCreateArticel: false,
      ProductNewLoading: false,
      Articel: "Articel",
      x: 0,
      y: 0,
      ArticelName: "",
      ActiveArticel: 0,
    };

    this.getCorps = this.getCorps.bind(this);
    this.toggleWayBillList = this.toggleWayBillList.bind(this);
    this.toggleFiles = this.toggleFiles.bind(this);
    this.toggleOrderList = this.toggleOrderList.bind(this);
    this.getProductType = this.getProductType.bind(this);
    this.GetOrders = this.GetOrders.bind(this);
    this.productEditShow = this.productEditShow.bind(this);
    this.productOutShow = this.productOutShow.bind(this);
    this.productOutShow = this.productOutShow.bind(this);
    this.CancelProduct = this.CancelProduct.bind(this);
    this.CancelEdit = this.CancelEdit.bind(this);

    this.CorpSearch = this.CorpSearch.bind(this);
    this.CancelCreateArticel = this.CancelCreateArticel.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.closeTopBar = this.closeTopBar.bind(this);
    this.LayoutRightShow = this.LayoutRightShow.bind(this);
    this.CancelCallOut = this.CancelCallOut.bind(this);
    this.CancelShare = this.CancelShare.bind(this);
    this.CancelNote = this.CancelNote.bind(this);

    this.CancelNewProduct = this.CancelNewProduct.bind(this);

    this.UpdateOrder = this.UpdateOrder.bind(this);
    this.SaveOrder = this.SaveOrder.bind(this);
    this.SaveArticel = this.SaveArticel.bind(this);
    this.SaveProductOut = this.SaveProductOut.bind(this);

    this.NewProductShow = this.NewProductShow.bind(this);

    this.ChangeProductType = this.ChangeProductType.bind(this);
    this.ChangeSalesType = this.ChangeSalesType.bind(this);
    this.ChangeCorpId = this.ChangeCorpId.bind(this);
    this.ChangeArticelName = this.ChangeArticelName.bind(this);
    this.ChangePiece = this.ChangePiece.bind(this);
    this.ChangeWeight = this.ChangeWeight.bind(this);
    this.ChangeDimensions = this.ChangeDimensions.bind(this);
    this.ChangeColor = this.ChangeColor.bind(this);
    this.ChangeWayBillId = this.ChangeWayBillId.bind(this);
    this.LayoutNoteShow = this.LayoutNoteShow.bind(this);
    this.MenuToggler = this.MenuToggler.bind(this);
    this.GetWaybillforOrder = this.GetWaybillforOrder.bind(this);
    this.CreateArticelShow = this.CreateArticelShow.bind(this);
    this.filterCorp = this.filterCorp.bind(this);
    this.CallOutonMouseMove = this.CallOutonMouseMove.bind(this);
    this.GetOrderEdit = this.GetOrderEdit.bind(this);
    this.getNotes = this.getNotes.bind(this);
    this.UpdateArticelNote = this.UpdateArticelNote.bind(this);
    this.SaveNotes = this.SaveNotes.bind(this);
  }
  CorpSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    result = this.state.Articels.filter((data) => {
      return data.ArticelName.toLowerCase().search(value) !== -1;
    });
    this.setState({ Articels: result });
  };
  UpdateArticelNote = (note) => {
    this.setState({ ArticelNotes: note });
  };
  SaveNotes() {
    this.setState({ isShow: true });
    var formData = new FormData();
    formData.append("ArticelId", this.state.ActiveArticel);
    formData.append("Notes", this.state.ArticelNotes);
    fetch("abi/post/AddNotes.ashx", {
      method: "POST",
      body: formData,
    })
      .then((response) => this.setState({ isShow: false }))
      .then((data) => console.log(data));
  }
  toggleWayBillList() {
    this.setState({ WayBillVisible: !this.state.WayBillVisible });
  }
  toggleFiles() {
    this.setState({ FilesVisible: !this.state.FilesVisible });
  }
  toggleView() {
    if (this.state.isShowOrder) {
      this.setState({ ChangeView: !this.state.ChangeView });
    } else {
    }
  }
  toggleOrderList() {
    this.setState({ OrderVisible: !this.state.OrderVisible });
  }
  ChangeProductType(TypeId) {
    this.setState({ TypeId: TypeId });
  }
  ChangeArticelName(Name) {
    this.setState({ ArticelName: Name });
  }
  ChangeCorpId(Id) {
    this.setState({ CorpId: Id });
  }

  MenuToggler = () => {
    this.setState({ MenuStatu: !this.state.MenuStatu });
  };
  ChangePiece(Piece) {
    this.setState({ Piece: Piece });
  }
  ChangeWeight(Weight) {
    this.setState({ Weight: Weight });
  }
  ChangeDimensions(Dimensions) {
    this.setState({ Dimensions: Dimensions });
  }
  ChangeWayBillId(Id) {
    this.setState({ WayBillId: Id });
  }

  ChangeColor(Color) {
    this.setState({ Color: Color });
  }
  ChangeSalesType(Id) {
    this.setState({ SaleTypeId: Id });
  }

  NewProductShow() {
    this.setState({ IsNewProductShow: true });
  }
  CreateArticelShow() {
    this.setState({
      IsCreateArticelShow: true,
      IsNewProductShow: false,
      isShowCallOut: false,
      isShowTopBar: false,
      isShowOrder: false,
    });

    document.getElementById("SecondScreen").classList.add("hide");
    document.getElementById("FirstScreen").classList.add("col-md-12");
    document.getElementById("FirstScreen").classList.remove("col-md-4");
    var selectedId = "Articel" + this.state.ActiveArticel;
    document.getElementById(selectedId).classList.remove("ActiveArticelRow");
  }
  CancelArticel() {
    this.setState({ IsCreateArticelShow: false });
  }
  SaveProductOut(OrderId) {
    this.setState({ OrderId: OrderId });
    setTimeout(() => this.PostProductOutSave(), 5000);
  }

  UpdateOrder() {
    this.PostOrderUpdate();
  }
  SaveOrder(a) {
    this.setState({ ProductNewLoading: true });

    this.PostOrdersave();
  }
  SaveArticel() {
    this.setState({ isShowCreateArticel: true });
    this.PostArticelsave();
  }

  async PostProductOutSave() {
    var url =
      "abi/post/AddWayBill.ashx?CorpId=" +
      this.state.CorpId +
      "&Piece=" +
      this.state.Piece +
      "&OrderId=" +
      this.state.OrderId +
      "&Weight=" +
      this.state.Weight +
      "&SaleType=1&Comment=9&WayBillId=" +
      this.state.WayBillId +
      "&ArticelId=" +
      this.state.ArticelId;

    await this.FetchFunc(url);
  }
  async PostArticelsave() {
    var url =
      "abi/post/AddArticel.ashx?CorpId=" +
      this.state.CorpId +
      "&Articel=" +
      this.state.ArticelName +
      "&SaleType=" +
      this.state.SaleTypeId;

    const response = await fetch(url, {
      method: "POST",
      cache: "no-cache",
      mode: "cors",
    });
    let articelid = response.json();
    this.setState({
      ArticelId: articelid,
      IsNewProductShow: true,
      IsCreateArticelShow: false,
    });
  }

  async PostOrdersave() {
    var url =
      "abi/post/AddOrder.ashx?ArticelId=" +
      this.state.ArticelId +
      "&ProductType=" +
      this.state.TypeId +
      "&Dimensions=" +
      this.state.Dimensions +
      "&CorpId=" +
      this.state.CorpId +
      "&Color=" +
      this.state.Color +
      "&Piece=" +
      this.state.Piece +
      "&SaleType=1&Articel=test";

    this.FetchFunc(url);
    this.setState({ ProductNewLoading: false });

    this.GetOrders(
      this.state.ArticelId,
      this.state.ArticelName,
      this.state.CorpName
    );
  }
  async PostOrderUpdate() {
    var url =
      "abi/post/UpdateOrder.ashx?OrderId=" +
      this.state.OrderId +
      "&ProductType=" +
      this.state.TypeId +
      "&Dimensions=" +
      this.state.Dimensions +
      "&Color=" +
      this.state.Color +
      "&Piece=" +
      this.state.Piece;
    const response = await fetch(url, {
      method: "POST",
      cache: "no-cache",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-credentials": false,
        "Access-Control-Allow-Origin": url,
        Authorization: "bearer ",
      },
    });

    this.setState({ isShowProductEdit: false });

    this.GetOrders(
      this.state.ArticelId,
      this.state.ArticelName,
      this.state.CorpName
    );
  }

  Closeproductmodal() {
    this.setState({ ismodalvisible: false, isShowCallOut: false });
  }
  LayoutRightShow() {
    this.setState({
      isShowLayoutRight: true,
      isShowTopBar: false,
      isShowCallOut: false,
    });
    document.getElementById("LayoutRight").style.width = "300px";
  }
  LayoutNoteShow() {
    this.setState({
      isShowLayoutNote: true,
      isShowLayoutRight: false,

      isShowTopBar: false,
      isShowCallOut: false,
    });
    document.getElementById("LayoutNote").style.width = "300px";
  }
  productOutShow() {
    this.setState({ isShowProductOut: true, isShowCallOut: false });
  }

  productEditShow() {
    this.setState({ isShowProductEdit: true, isShowCallOut: false });
  }

  CancelProduct() {
    this.setState({ isShowProductOut: false, isShowCallOut: false });
  }

  CancelNewProduct() {
    this.setState({ IsNewProductShow: false, isShowCallOut: false });
  }
  CancelEdit() {
    this.setState({ isShowProductEdit: false, isShowCallOut: false });
  }
  CancelCreateArticel() {
    this.setState({ IsCreateArticelShow: false, isShowCallOut: false });
  }

  CancelShare() {
    this.setState({
      isShowLayoutRight: false,
      isShowTopBar: true,
      isShowCallOut: false,
    });
    document.getElementById("LayoutRight").style.width = "0px";
  }
  CancelNote() {
    this.setState({
      isShowLayoutRight: false,
      isShowLayoutNote: false,
      isShowCallOut: false,
      isShowTopBar: true,
    });
    document.getElementById("LayoutNote").style.width = "0px";
  }
  CancelCallOut() {
    this.setState({ isShowCallOut: false });
  }

  closeTopBar() {
    this.setState({
      isShowTopBar: false,
      isShowCallOut: false,
      ActiveArticel: 0,
    });

    document.getElementById("SecondScreen").classList.add("hide");
    document.getElementById("FirstScreen").classList.add("col-md-12");
    document.getElementById("FirstScreen").classList.remove("col-md-4");
    var selectedId = "Articel" + this.state.ActiveArticel;
    document.getElementById(selectedId).classList.remove("ActiveArticelRow");
  }

  TransferSummary(weight, piece) {
    this.setState({
      TotalOutPiece: 1 + piece,
      TotalOutWeight: 1 + weight,
      LoopCount: 99,
    });
  }

  async GetWaybillPhoto(WaybillId) {}
  async GetWaybillAsync(ArticelId) {
    this.setState({
      Waybill: [],
      isShow: true,
    });

    this.setState({
      Waybill: await this.FetchFunc(
        USER_SERVICE_URL + "Motion&MotionType=Multi&OrderId=" + ArticelId
      ),
      isShow: false,
    });
  }

  async GetFilesAsync(ArticelId) {
    this.setState({
      Files: [],
      isShowFiles: false,
    });
    var url = USER_SERVICE_URL + "Pictures&ArticelId=" + ArticelId;
    const response = await fetch(url, {
      method: "POST",
      cache: "no-cache",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-credentials": false,
        "Access-Control-Allow-Origin": url,
        Authorization: "bearer ",
      },
    });
    this.setState({
      Files: await response.json(),
      isShowFiles: false,
    });
    if (this.state.Files === "") {
      this.setState({ isShowFiles: false });
    } else {
      this.setState({ isShowFiles: true });
    }
  }

  GetOrderEdit(id, dimensions, color, piece, typeName, TypeId) {
    this.setState({
      Piece: piece,
      TypeId: TypeId,
      Dimensions: dimensions,
      Color: color,
      OrderId: id,
      ProductTypeName: typeName,
      ismodalvisible: true,
      isShowProductEdit: true,
    });
  }

  CallOutonMouseMove(e) {
    this.setState({
      x: e.pageX + "px",
      y: e.pageY + "px",
    });
  }
  async GetWaybillforOrder(OrderId, dimensions, color, producttypename) {
    this.setState({
      Dimensions: dimensions,
      OneWayBill: [],
      Color: color,
      ProductTypeName: producttypename,
      CalloutLoading: true,
      isShowCallOut: true,
      isShow: true,
    });

    this.setState({
      OneWayBill: await this.FetchFunc(
        USER_SERVICE_URL + "Motion&MotionType=One&OrderId=" + OrderId
      ),
      isShow: false,
    });
    var wayPiece = 0;
    var wayWeight = 0;

    this.state.OneWayBill.map(
      (w) => (wayPiece = wayPiece + parseInt(w.Piece, 10))
    );

    this.setState({
      LoopCount: this.state.OneWayBill.length,
      CalloutLoading: false,
      TotalOutPiece: wayPiece,
      TotalOutWeight: wayWeight,
    });
  }

  async getProductType() {
    this.setState({
      ProductTypes: await this.FetchFunc("abi/post/ProductType.ashx"),
    });
  }
  async getCorps() {
    var CorpUrl = "abi/post/CorpList.ashx";
    const response = await fetch(CorpUrl, {
      method: "POST",
      cache: "no-cache",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-credentials": false,
        "Access-Control-Allow-Origin": CorpUrl,
        Authorization: "bearer ",
      },
    });

    this.setState({
      Corps: await response.json(),
    });
  }

  async getSalesTypes() {
    this.setState({
      SalesTypes: await this.FetchFunc("abi/post/SaleType.ashx"),
    });
  }
  async getNotes(ArticelId) {
    fetch("abi/post/ArticelNotes.ashx?ArticelId=" + ArticelId)
      .then((response) => response.text())
      .then((response) => {
        this.setState({
          ArticelNotes: response,
        });
      })
      .catch((err) => console.log(err));
  }

  filterCorp(CorpId) {
    this.setState({
      Articels: this.state.Articels.filter(
        (articel) => articel.CorpId === CorpId
      ),
    });
  }

  async GetOrders(ArticelId, CorpId, ArticelName, CorpName) {
    this.setState({
      isShow: true,
      CorpId: CorpId,
      ArticelId: ArticelId,
      isShowTopBar: true,
      isShowCallOut: false,
      ArticelName: ArticelName,
      CorpName: CorpName,
      isShowLayoutNote: false,
      isShowLayoutRight: false,
    });
    document.getElementById("LayoutRight").style.width = "0px";
    document.getElementById("LayoutNote").style.width = "0px";

    this.GetWaybillAsync(ArticelId);
    this.getNotes(ArticelId);
    this.GetFilesAsync(ArticelId);

    this.setState({
      Orders: [],
      isShowOrder: true,
    });

    if (this.state.ActiveArticel === 0) {
      this.state.ActiveArticel = ArticelId;
    } else {
      var selectedId = "Articel" + this.state.ActiveArticel;
      document.getElementById(selectedId).classList.remove("ActiveArticelRow");

      this.setState({
        ActiveArticel: ArticelId,
      });
    }

    var Clicked = "Articel" + ArticelId;
    document.getElementById(Clicked).classList.add("ActiveArticelRow");
    document.getElementById("ArticelName").innerHTML = ArticelName;
    document.getElementById("SecondScreen").classList.remove("hide");
    document.getElementById("SecondScreen").classList.add("col-md-8");
    document.getElementById("FirstScreen").classList.add("col-md-4");
    document.getElementById("FirstScreen").classList.remove("col-md-12");
    var FullUrl = USER_SERVICE_URL + "Orders&ArticelId=" + ArticelId;
    this.setState({
      Orders: await this.FetchFunc(FullUrl),
      isShow: false,
      isShowOrder: true,
    });
  }

  render() {
    return (
      <div className="padd0 col-md-12">
        <div id="PrintArea" className="col-md-12 hide hidden">
          {this.state.Orders.map((o) => (
            <div key={o.id} className="he col-md-2">
              <h5>
                <span>{o.Dimensions}</span> <span> {o.Color}</span>
                {o.ProductTypeName}
              </h5>
              <hr /> {o.Piece} {o.Metrics}
            </div>
          ))}
        </div>
        <TopBar
          CorpSearch={this.CorpSearch}
          NewProductShow={this.NewProductShow}
          toggleView={this.toggleView}
          closeTopBar={this.closeTopBar}
          MenuToggler={this.MenuToggler}
          LayoutRightShow={this.LayoutRightShow}
          isShowTopBar={this.state.isShowTopBar}
          productEditShow={this.productEditShow}
          productOutShow={this.productOutShow}
          MenuStatu={this.state.MenuStatu}
          Corps={this.state.Corps}
          filterCorp={this.filterCorp}
          ArticelId={this.state.ArticelId}
          CorpName={this.state.CorpName}
          LayoutNoteShow={this.LayoutNoteShow}
        />

        <div
          className={
            this.state.IsFirstRun ? "show pagefirstloading" : "opaq0 hide"
          }
        >
          <div className="text-center">İlk Açılış ayarlanıyor</div>

          <div className="prf ProgressSpinnerFlat" role="progressbar">
            <div aria-hidden="true">•</div>
            <div aria-hidden="true">•</div>
            <div aria-hidden="true">•</div>
            <div aria-hidden="true">•</div>
          </div>
        </div>

        <div
          className={
            this.state.isShow
              ? "show ProgressSpinnerFlat"
              : "opaq0 ProgressSpinnerFlat"
          }
          role="progressbar"
        >
          <div aria-hidden="true">•</div>
          <div aria-hidden="true">•</div>
          <div aria-hidden="true">•</div>
          <div aria-hidden="true">•</div>
          <div aria-hidden="true">•</div>
          <div aria-hidden="true">•</div>
          <div aria-hidden="true">•</div>
        </div>
        <div
          id="FirstScreen"
          className={
            this.state.ChangeView ? "hide" : "WizardArea padd0 col-md-12"
          }
        >
          <ArticelsTable
            GetOrders={this.GetOrders}
            Articel={this.state.Articel}
            Articels={this.state.Articels}
          />
        </div>
        <div
          id="SecondScreen"
          className={
            this.state.ChangeView
              ? "WizardArea padd0 col-md-12"
              : "WizardArea padd0 col-md-8"
          }
        >
          <div
            id="ArticelName"
            onClick={() => this.toggleOrderList()}
            className="ArticelNameHead SSOrder text-capitalize PartHead"
          ></div>

          <div
            className={
              this.state.OrderVisible
                ? "DetailOrders SSOrder  OrderDetailsComment"
                : "hide"
            }
          >
            <OrdersTable
              GetOrderEdit={this.GetOrderEdit}
              GetWaybillforOrder={this.GetWaybillforOrder}
              CallOutonMouseMove={this.CallOutonMouseMove}
              Orders={this.state.Orders}
            />
          </div>

          <div className={this.state.Waybill.length === 0 ? "hide" : ""}>
            <div onClick={() => this.toggleWayBillList()} className="PartHead">
              İrsaliyeler
            </div>
            <div className={this.state.WayBillVisible ? "" : "hide"}>
              <WayBillList Waybill={this.state.Waybill} />
            </div>
          </div>
          <div className={this.state.isShowFiles ? "" : "hide"}>
            <div
              onClick={() => {
                this.toggleFiles();
              }}
              className="PartHead"
            >
              Dökümanlar
            </div>
            <div className={this.state.FilesVisible ? "" : "hide"}>
              <Files Files={this.state.Files} />
            </div>
          </div>

          <LayoutRight
            CancelShare={this.CancelShare}
            isShowLayoutRight={this.state.isShowLayoutRight}
          />

          <LayoutNote
            CancelNote={this.CancelNote}
            SaveNotes={this.SaveNotes}
            UpdateArticelNote={this.UpdateArticelNote}
            ArticelNotes={this.state.ArticelNotes}
            isShowLayoutNote={this.state.isShowLayoutNote}
          />
        </div>

        <div className={this.state.isShowProductOut ? "" : "hide"}>
          <ProductOutModal
            ChangePiece={this.ChangePiece}
            ChangeWeight={this.ChangeWeight}
            ChangeWayBillId={this.ChangeWayBillId}
            CancelProduct={this.CancelProduct}
            OrderList={this.state.Orders}
            ArticelName={this.state.ArticelName}
            SaveProductOut={this.SaveProductOut}
          />
        </div>

        <ProductEditModal
          isShowProductEdit={this.state.isShowProductEdit}
          UpdateOrder={this.UpdateOrder}
          CancelEdit={this.CancelEdit}
          ChangeProductType={this.ChangeProductType}
          ProductTypes={this.state.ProductTypes}
          Piece={this.state.Piece}
          Dimensions={this.state.Dimensions}
          Typeid={this.state.TypeId}
          ProductTypeName={this.state.ProductTypeName}
          Color={this.state.Color}
          OrderId={this.state.OrderId}
        />

        <div className={this.state.IsCreateArticelShow ? "" : "hide"}>
          <CreateArticelModal
            Corps={this.state.Corps}
            Piece={this.state.Piece}
            Dimensions={this.state.Dimensions}
            Typeid={this.state.TypeId}
            ProductTypeName={this.state.ProductTypeName}
            Color={this.state.Color}
            ProductTypes={this.state.ProductTypes}
            ChangeArticelName={this.ChangeArticelName}
            CancelCreateArticel={this.CancelCreateArticel}
            ChangeCorpId={this.ChangeCorpId}
            ChangeSalesType={this.ChangeSalesType}
            SalesTypes={this.state.SalesTypes}
            SaveArticel={this.SaveArticel}
            isShowCreateArticel={this.state.isShowCreateArticel}
          />
        </div>
        <div className={this.state.IsNewProductShow ? "" : "hide"}>
          <ProductNewModal
            SaveOrder={this.SaveOrder}
            CancelNewProduct={this.CancelNewProduct}
            ChangeProductType={this.ChangeProductType}
            ChangePiece={this.ChangePiece}
            ChangeDimensions={this.ChangeDimensions}
            ChangeColor={this.ChangeColor}
            ProductTypes={this.state.ProductTypes}
            ProductNewLoading={this.state.ProductNewLoading}
          />
        </div>

        <div className={this.state.isShowCallOut ? "" : "hide"}>
          <div
            id="PopupWaybill"
            style={{ top: this.state.y, left: this.state.x }}
            className="ms-ContextualHost is-positioned ms-ContextualHost--arrowLeft is-open ms-ContextualHost--primaryArrow"
          >
            <CallOut
              CalloutLoading={this.state.CalloutLoading}
              CancelCallOut={this.CancelCallOut}
              TotalOutPiece={this.state.TotalOutPiece}
              LoopCount={this.state.LoopCount}
              Dimensions={this.state.Dimensions}
              Color={this.state.Color}
              ProductTypeName={this.state.ProductTypeName}
              OneWayBill={this.state.OneWayBill}
            />
          </div>
        </div>
        <LeftNav
          CreateArticelShow={this.CreateArticelShow}
          MenuStatu={this.state.MenuStatu}
        />
      </div>
    );
  }

  updateDimensions = () => {
    this.setState({ isShowCallOut: false });
  };

  componentDidMount() {
    this.fetcharticels();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  async fetcharticelsAsync() {
    this.setState({
      Articels: await this.FetchFunc(USER_SERVICE_URL + "Articels"),
      isShow: false,
      IsFirstRun: false,
    });
    this.getProductType();
    this.getCorps();
    this.getSalesTypes();
  }
  async FetchFunc(Url) {
    const response = await fetch(Url, {
      method: "POST",
      cache: "no-cache",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-credentials": false,
        "Access-Control-Allow-Origin": Url,
        Authorization: "bearer ",
      },
    });
    return response.json();
  }

  fetcharticels = this.fetcharticelsAsync;
}

export default MainPage;
