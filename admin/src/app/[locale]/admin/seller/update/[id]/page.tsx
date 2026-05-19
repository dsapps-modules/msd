import CustomLayout from "@/components/layout/CustomLayout";
import EditSeller from "@/components/screen/admin-section/seller/EditSeller";


type Props = { params: Promise<{ id: string }> };
const UpdateSellerPage = async ({ params }: Props) => {
  const { id } = await params;
  return (
    <>
      <CustomLayout>
        <EditSeller ID={id} />
      </CustomLayout>
    </>
  );
};

export default UpdateSellerPage;
