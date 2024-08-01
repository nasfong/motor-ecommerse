'use client'
import { Button } from "@/components/ui/button"
import boy_svg from "@/assets/svg/boy.svg"
import { Form } from "@/components/ui/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { InputForm } from "@/components/form/InputForm"
import { useMutationLogin } from "@/hook"
import Image from "next/image"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  username: z.string().min(1, { message: 'username is required!' }),
  password: z.string().min(3, {
    message: "password must be at least 8 characters long."
  }),
})

const LoginPage = () => {
  const router = useRouter();

  const { mutate, isPending: loginLoading, isSuccess } = useMutationLogin()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data, {
      onSuccess: () => {
        router.push('/all-product');
      }
    });
  }


  return (
    <div className="lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your username below to login to your account
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <InputForm
                    form={form}
                    id="username"
                    name="username"
                    placeholder="username"
                    label="Username"
                  />
                </div>
                <div className="grid gap-2">
                  <InputForm
                    form={form}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="password"
                    label="Password"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src={boy_svg}
          alt="Image"
          className="h-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>

  )
}

export default LoginPage