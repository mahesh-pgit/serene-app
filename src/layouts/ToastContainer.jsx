import { useToasts } from "../contexts/ToastsContext";

const ToastContainer = () => {
	const { toasts } = useToasts();

	return (
		<div className="fixed top-1 left-[50%] -translate-x-2/4 flex flex-col gap-y-2 z-500">
			{toasts.map((toast) => (
				<div
					key={toast.id}
					className={`toast max-w-xs py-2 px-3 text-sm text-white text-center bg-gray-500 rounded-lg ${
						toast.type === "success" && "bg-green-500"
					} ${toast.type === "error" && "bg-red-500"} ${
						toast.type === "info" && "bg-sky-500"
					} ${toast.type === "warning" && "bg-yellow-500"}`}>
					{toast.message}
				</div>
			))}
		</div>
	);
};

export default ToastContainer;
