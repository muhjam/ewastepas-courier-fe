import ImageWithFallback from "../../TagImage/ImageWithFallback";
import IcEmptyFile from "../../../assets/empty-file.svg";
import WaitingApproval from "../../../assets/waiting-approval.png";
import handleLogout from "../../../utils/HandleLogout";

// eslint-disable-next-line react/prop-types
export default function ModalWaiting({ setIsWaiting }) {

  return (
    <div className="fixed left-0 right-0 top-0 h-[100dvh] z-[99] flex justify-center items-center">
      <div className="!w-full !h-[100dvh] !bg-black opacity-[0.8]" style={{ backgroundColor: "black" }}></div>
      <div className="fixed px-[12px] py-[26px] flex-col bg-white rounded-md justify-center items-center h-max-[500px] max-w-[600px] min-w-[300px] w-[600px] overflow-x-auto">
        <h1 className="text-2xl font-semibold text-center mb-8">
          Menunggu Konfirmasi dari Admin
        </h1>
        <ImageWithFallback
          src={WaitingApproval}
          alt="Preview"
          fallbackSrc={IcEmptyFile}
          className="w-[316px] object-cover mx-auto"
        />
        <div className="w-full flex justify-center">
        <button
          type="button"
          className="bg-revamp-secondary-500 w-fit py-[8px] px-[46px] text-white text-[14px] font-[600] rounded-[15px]"
          onClick={() => setIsWaiting(true)}
          >
          Ubah Kembali
        </button>
        </div>
        <div className="flex justify-center items-center mt-[10px]">
          <span className="text-revamp-neutral-10 font-[500] text-[14px]">
            Anda mau ganti akun?{" "}
            <a
              onClick={handleLogout}
              className="text-revamp-error-300 cursor-pointer"
              >
              Logout
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
