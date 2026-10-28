export type OrderStatus = "pending" | "processing" | "shipped" | "completed" | "cancelled";
export type CategoryType = "blog" | "product";

type Table<Row, Insert, Update> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

export interface Database {
  public: {
    Tables: {
      products: Table<
        {
          slug: string;
          name: string;
          category: string;
          tagline: string;
          description: string;
          overview: string[];
          specs: { property: string; value: string }[];
          sub_types: { name: string; mfi: string; density: string; useCase: string }[];
          applications: string[];
          packaging: string[];
          image_url: string;
          created_at: string;
          updated_at: string;
        },
        {
          slug: string;
          name: string;
          category: string;
          tagline: string;
          description: string;
          overview: string[];
          specs: { property: string; value: string }[];
          sub_types: { name: string; mfi: string; density: string; useCase: string }[];
          applications: string[];
          packaging: string[];
          image_url: string;
          created_at?: string;
          updated_at?: string;
        },
        Partial<{
          slug: string;
          name: string;
          category: string;
          tagline: string;
          description: string;
          overview: string[];
          specs: { property: string; value: string }[];
          sub_types: { name: string; mfi: string; density: string; useCase: string }[];
          applications: string[];
          packaging: string[];
          image_url: string;
          updated_at: string;
        }>
      >;
      blogs: Table<
        {
          slug: string;
          title: string;
          date: string;
          read_time: string;
          status: "draft" | "published";
          category: string;
          author: string;
          excerpt: string;
          content: string[];
          image_url: string;
          tags: string[];
          created_at: string;
          updated_at: string;
        },
        {
          slug: string;
          title: string;
          date: string;
          read_time: string;
          status: "draft" | "published";
          category: string;
          author: string;
          excerpt: string;
          content: string[];
          image_url: string;
          tags: string[];
          created_at?: string;
          updated_at?: string;
        },
        Partial<{
          slug: string;
          title: string;
          date: string;
          read_time: string;
          status: "draft" | "published";
          category: string;
          author: string;
          excerpt: string;
          content: string[];
          image_url: string;
          tags: string[];
          updated_at: string;
        }>
      >;
      admin_categories: Table<
        { id: string; name: string; type: CategoryType; created_at: string },
        { id?: string; name: string; type: CategoryType; created_at?: string },
        Partial<{ name: string; type: CategoryType }>
      >;
      admin_orders: Table<
        {
          id: string;
          order_number: string;
          customer: string;
          email: string;
          product: string;
          quantity: number;
          total: number;
          status: OrderStatus;
          created_at: string;
        },
        {
          id?: string;
          order_number: string;
          customer: string;
          email: string;
          product: string;
          quantity: number;
          total: number;
          status?: OrderStatus;
          created_at?: string;
        },
        Partial<{
          customer: string;
          email: string;
          product: string;
          quantity: number;
          total: number;
          status: OrderStatus;
        }>
      >;
      enquiries: Table<
        {
          id: string;
          full_name: string;
          company_name: string;
          email: string;
          phone: string;
          destination_port: string;
          country: string;
          product_slug: string;
          product_name: string;
          grade: string;
          volume: string;
          packaging: string;
          notes: string;
          status: "new" | "contacted" | "quoted" | "closed";
          created_at: string;
        },
        {
          id?: string;
          full_name: string;
          company_name: string;
          email: string;
          phone: string;
          destination_port: string;
          country: string;
          product_slug: string;
          product_name: string;
          grade: string;
          volume: string;
          packaging: string;
          notes?: string;
          status?: "new" | "contacted" | "quoted" | "closed";
          created_at?: string;
        },
        Partial<{
          status: "new" | "contacted" | "quoted" | "closed";
        }>
      >;
    };
    Views: Record<string, never>;
    Functions: {
      rename_admin_category: {
        Args: { p_id: string; p_name: string };
        Returns: { id: string; name: string; type: CategoryType }[];
      };
      delete_admin_category: {
        Args: { p_id: string };
        Returns: undefined;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
