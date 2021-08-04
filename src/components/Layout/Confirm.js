import React from "react";
import SevkConsumer from "../../store/context";
import BlueButton from "../Tools/BlueButton";
import ProgressBar from "../Tools/ProgressBar";
export default function Confirm() {
  return (
    <SevkConsumer>
      {(value) => {
        const { Loading, dispatch, ShowConfirm } = value;
        const ConfirmAccept = () => {
          dispatch({
            type: "ConfirmAccept",
          });
        };
        const ConfirmToggle = () => {
          dispatch({ type: "ConfirmToggle", payload: false });
        };
        return ShowConfirm ? (
          <div className="ms-Fabric effect ms-Layer-content content-105 root-103">
            <div className="ms-Modal is-open ms-Dialog _viD3f-XQDTpekTDSdo5 root-384">
              <div className="ms-Dialog-main main-385">
                <div className="ms-Modal-scrollableContent scrollableContent-386">
                  <div className="ms-Dialog-header header-390">
                    <div className="ms-Dialog-title title-393">
                      Emin misiniz ?
                    </div>
                  </div>
                  <div className="ms-Dialog-inner inner-391">
                    <div className="ms-Dialog-content innerContent-392">
                      <p className="ms-Dialog-subText subText-389">
                        {Loading ? (
                          <span>Lütfen Bekleyin</span>
                        ) : (
                          <span>
                            Bu artikel/sipariş silinecek.
                            <br />
                            İşlem geri alınamaz! <br />
                            Notlar,ürünler,irsaliyeler ve sipariş dosyaları da
                            silinecek.
                          </span>
                        )}
                      </p>
                    </div>
                    <ProgressBar isVisible={Loading} />
                    {Loading ? null : (
                      <div className="actionsRight-397">
                        <span  className="action-396">
                          <BlueButton text="Evet" click={ConfirmAccept} />
                        </span>
                        <span className="action-396">
                          <button
                            onClick={ConfirmToggle}
                            type="button"
                            className="root-376"
                          >
                            Vazgeç
                          </button>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null;
      }}
    </SevkConsumer>
  );
}