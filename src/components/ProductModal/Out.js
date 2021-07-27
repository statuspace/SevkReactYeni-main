import React from "react";
import BlueButton from "../Tools/BlueButton";
import CancelBtn from "../Tools/CancelBtn";
export default function Out({
  isShowProductOut,
  CancelProduct,
  ChangeWayBillId,
  ChangePiece,
  OrderList,
  ChangeWeight,
  SaveProductOut,
}) {
  return isShowProductOut ? (
    <div className="ms-Layer ms-Layer--fixed effect layer-351">
      <div className="root-345">
        <div className="ms-Dialog-main  main-412">
          <CancelBtn click={CancelProduct} />
          <div className="col-xs-12">
            <h4>Ürün Çıkışı</h4>
            <input
              type="text"
              onChange={(e) => ChangeWayBillId(e.target.value)}
              placeholder="İrsaliye No"
              className="irsaliyeno col-xs-1 paddleft2 ms-TextField-field"
            />
            {OrderList.map((o) => (
              <div key={o.id} className="col-xs-12 padd0 OrderRow">
                <div className="col-xs-6 padd0 padd0 fleft">
                  <span className="minifont">
                    <b> {o.Piece} AD</b> {o.Dimensions} {o.Color}{" "}
                    {o.ProductTypeName}
                  </span>
                </div>
                <div className="col-xs-2 padd0 fleft">
                  <input
                    type="text"
                    placeholder="Adet"
                    onChange={(e) => ChangePiece(e.target.value)}
                    className="Piece ms-TextField-field w60"
                  />
                </div>
                <div className="col-xs-2 padd0 fleft">
                  <input
                    type="text"
                    placeholder="KG"
                    onChange={(e) => ChangeWeight(e.target.value)}
                    className="Weight ms-TextField-field w60"
                  />
                </div>
                <div className="col-xs-2 padd0 text-center fleft">
                  <BlueButton click={SaveProductOut(o.id)} text="Kaydet" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}