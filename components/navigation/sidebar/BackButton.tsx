import { CustomButton } from '../../buttons/CustomButton';

interface Props {
  handleBack: () => void;
}

export default function BackButton({ handleBack }: Props) {
  return (
    <CustomButton
      variant="bordered"
      color="default"
      onClick={handleBack}
      title="Ir atrás"
    />
  );
}
