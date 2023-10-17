"use client";
import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { FieldValues, useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";

enum STEPS {
  CATEGORY,
  LOCATION,
  INFO,
  IMAGES,
  DESCRIPTION,
  PRICE,
}

const RentModal = () => {
  const rentModal = useRentModal();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);
  const onBack = () => setStep((val) => val - 1);
  const onNext = () => setStep((val) => val + 1);

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imgSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");

  const Map = useMemo(() => {
    return dynamic(() => import("../Map"), { ssr: false });
  }, [location]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describe your place?"
        subtitle="Pick a category"
      />
      <div
        className="
        grid
        max-h-[50vh]
        grid-cols-1
        gap-3
        overflow-y-auto
        pr-4
        md:grid-cols-2
      "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category == item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenenties do you have?"
        />
        <Counter />
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      title="Airbnb your home!"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      onSubmit={onNext}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default RentModal;
