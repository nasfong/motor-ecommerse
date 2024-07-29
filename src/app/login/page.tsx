import { Button } from "@/components/ui/button"
import boy_svg from "@/assets/svg/boy.svg"
import { Form } from "@/components/ui/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { InputForm } from "@/components/form/InputForm"
import { useMutationLogin } from "@/hook"

const formSchema = z.object({
  username: z.string().min(1, { message: 'username is required!' }),
  password: z.string().min(8, {
    message: "password must be at least 8 characters long."
  }),
})

const LoginPage = () => {

  const { mutate, isPending: loginLoading } = useMutationLogin()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data, {
      onSuccess: (response) => {
        console.log('Response:', response.data);
        toast('Event has been created', {
          description: JSON.stringify(data, null, 2),
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo')
          }
        });
      },
      onError: (error) => {
        console.error('Error:', error);
        toast.error('Failed to create event');
      }
    });
  }

  return (

    <div className="lg:grid lg:grid-cols-2 h-[100vh]">
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
                  {/* <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div> */}
                  <InputForm
                    form={form}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="password"
                    label="Password"
                  />
                </div>
                <Button type="submit" className="w-full" loading={loginLoading}>
                  Login
                </Button>

                {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            {/* <Link href="#" className="underline">
              Sign up
            </Link> */}
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src={boy_svg}
          alt="Image"
          className="h-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>

  )
}

export default LoginPage
